import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this._authService.login("vendramemichele99@gmail.com", "test")
      .subscribe(user => JSON.stringify(user));
  }

}
