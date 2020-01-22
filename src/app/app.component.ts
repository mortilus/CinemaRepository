import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { ILoggedUser } from './shared/models/IUser';
import { Subscription } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  public currentUser: ILoggedUser = null;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _permissionsService: NgxPermissionsService) {
      if(localStorage.getItem('loggedUser')) {
        let user = JSON.parse(localStorage.getItem('loggedUser')) || {};
        this._permissionsService.loadPermissions([user.role]);
      }
    }

  ngOnInit(): void {
    this._initSubscriptions();
  }

  private _initSubscriptions() {
    this._subscriptions.push(
      this._authService.currentUser.subscribe(user => this.currentUser = user)
    );
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
