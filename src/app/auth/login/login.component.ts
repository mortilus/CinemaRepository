import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscrptions: Subscription[] = [];

  public message: { cssClass: string, text: string } = null;
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public loading: boolean = false;

  constructor(private _authService: AuthService, private _router: Router, private _formBuilder: FormBuilder) {
    if (this._authService.curentLoggedUserValue)
      this._authService.logout();
  }

  ngOnInit() {
    this._initSubscriptions();
    this._initStatus();
  }

  private _initSubscriptions() {
    this.subscrptions.push(
      this._authService.currentError$
        .subscribe(errorMessage => {
          this.loading = false;
          this.message = errorMessage;
        })
    );
  }
  private _initStatus() {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const typedEmail = this.loginForm.get('email').value;
    const typedPassword = this.loginForm.get('password').value;
    this._authService.login(typedEmail, typedPassword)
      .pipe(first())
      .subscribe(user => {
        if (user) {
          this.loading = true;
          this._router.navigate(['/home']);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscrptions.forEach(sub => sub.unsubscribe());
  }
}
