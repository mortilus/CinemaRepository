import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { ILoggedUser } from './shared/models/IUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentUser: ILoggedUser = null;

  constructor(private _authService: AuthService, private _router: Router) {
    this._authService.currentUser.subscribe(user => this.currentUser = user);
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
