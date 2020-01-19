import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentUser: any = null;

  constructor(private _authService: AuthService) {
    this._authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this._authService.logout();
  }
}
