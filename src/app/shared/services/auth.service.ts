import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { MainService } from './main.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = '';

  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(
    private _http: HttpClient,
    private _mainService: MainService) {
    this._url = this._mainService.getMainUrl();
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('loggedUser')));
    console.log("Current user subject: " + JSON.stringify(this.currentUserSubject));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get curentLoggedUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this._http.get<IUser>(`${this._url}/users`)
      .pipe(
        map(userList => {
          
          // console.log("User " + JSON.stringify(user));
          // // login successful if there's a jwt token in the response
          // if (user && user.token) {
          //   // store user details and jwt token in local storage to keep user logged in between page refreshes
          //   localStorage.setItem('currentUser', JSON.stringify(user));
          //   this.currentUserSubject.next(user);
          // }

          // return user;
        }));
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.currentUserSubject.next(null);
  }
}
