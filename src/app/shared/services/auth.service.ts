import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, ILoggedUser } from '../models/IUser';
import { MainService } from './main.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = '';

  private currentUserSubject: BehaviorSubject<ILoggedUser>;
  public currentUser: Observable<ILoggedUser>;

  constructor(
    private _http: HttpClient,
    private _mainService: MainService) {
    this._url = this._mainService.getMainUrl();
    this.currentUserSubject = new BehaviorSubject<ILoggedUser>(JSON.parse(localStorage.getItem('loggedUser')));
    console.log("Current user subject: " + JSON.stringify(this.currentUserSubject));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get curentLoggedUserValue(): ILoggedUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<ILoggedUser> {
    return this._http.get<IUser[]>(`${this._url}/users`)
      .pipe(
        map(userList => {
          var foundUser: IUser = userList.find(u => u.email === email && u.password === password);
          if (foundUser) {
            var loggedUser: ILoggedUser = {
              id: foundUser.id,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              birthDate: foundUser.birthDate,
              email: foundUser.email,
              role: foundUser.role,
              token: 'fake-jwt-token'
            };
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            this.currentUserSubject.next(loggedUser)
            return loggedUser;
          }
          return null;
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
