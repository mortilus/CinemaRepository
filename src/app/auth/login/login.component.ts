import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    this._authService.login("vendramemichele99@gmail.com", "test")
      .pipe(first())
      .subscribe(user => {
        if(user) {
          this._router.navigate(['/']);
        }
      });
  }

}
