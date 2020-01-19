import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IError } from 'src/app/shared/models/IError';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  public message: IError = null;
  public registerForm: FormGroup;
  public submitted: boolean = false;
  public loading: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) {
    if (this._authService.curentLoggedUserValue)
      this._authService.logout();
  }

  ngOnInit() {
    this._initSubscriptions();
    this._initStatus();
  }

  private _initSubscriptions() {
    this._authService.currentError$
      .subscribe(errorMessage => {
        this.message = errorMessage;
      })
  }
  private _initStatus() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() { return this.registerForm.controls; }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid)
      return;

    this.loading = true;
    const birthDate = this.registerForm.get('birthDate').value;

    this._authService.register({
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      birthDate: `${birthDate.day}/${birthDate.month}/${birthDate.year}`,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      role: "user"
    })
      .subscribe(res => {
        this.loading = true;
        this._router.navigate(['/login'])
      });
  }

  login() {
    this._router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
