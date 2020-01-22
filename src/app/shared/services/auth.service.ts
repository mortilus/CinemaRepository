import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUser, ILoggedUser, IRegisterUser } from '../models/IUser';
import { MainService } from './main.service';
import { map } from 'rxjs/operators';
import { IError } from '../models/IError';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = '';

  private currentUserSubject: BehaviorSubject<ILoggedUser>;
  public currentUser: Observable<ILoggedUser>;

  private _currentErrorSubject = new Subject<IError>();
  currentError$ = this._currentErrorSubject.asObservable();

  constructor(
    private _http: HttpClient,
    private _mainService: MainService,
    private _permissionsService: NgxPermissionsService) {
    this._url = this._mainService.getMainUrl();
    this.currentUserSubject = new BehaviorSubject<ILoggedUser>(JSON.parse(localStorage.getItem('loggedUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get curentLoggedUserValue(): ILoggedUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<ILoggedUser> {
    return this._http.get<IUser[]>(`${this._url}/users`)
      .pipe(
        map(userList => {
          //If the user is found, it means that the credentials were correct
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
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser)); //User saved in ls
            this._permissionsService.loadPermissions([loggedUser.role]);
            this._currentErrorSubject.next({ cssClass: 'alert alert-success', text: 'Successfuly logged in!' });
            this.currentUserSubject.next(loggedUser); //Logged user subject is updated
            return loggedUser;
          }
          if (userList.find(u => u.email === email)) {
            this._currentErrorSubject.next({ cssClass: 'alert alert-danger', text: 'Password incorrect, retype it' });
          } else { this._currentErrorSubject.next({ cssClass: 'alert alert-danger', text: 'Email wasn´t found' }); }
          return null;
        }));
  }

  register(user: IRegisterUser) {
    return this._http.post(`${this._url}/users`, user);
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.currentUserSubject.next(null);
  }
}
