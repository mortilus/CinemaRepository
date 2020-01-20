import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { ILoggedUser } from './shared/models/IUser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  public currentUser: ILoggedUser = null;

  constructor(private _authService: AuthService, private _router: Router) { }

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
