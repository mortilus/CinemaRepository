import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _url: string = '';

  constructor(private _mainService: MainService, private _http: HttpClient) {
    this._url = this._mainService.getMainUrl();
  }

  getUsers(embedReservations: boolean, searchedUser: string) {
    var url = `${this._url}/users`;
    if (embedReservations && searchedUser && searchedUser != '') {
      url = `${url}?_embed=reservations&email_like=${searchedUser}`;
    } else if(embedReservations){
      url = `${url}?_embed=reservations`;
    } else if(searchedUser && searchedUser != '') {
      url = `${url}?email_like=${searchedUser}`;
    }
    return this._http.get<IUser[]>(url);
  }

  getUserById(id: number) {
    const url = `${this._url}/users/${id}?_embed=reservations`;
    return this._http.get<IUser>(url);
  }

  saveUserModifications(modifiedUser: IUser) {
    const url = `${this._url}/users/${modifiedUser.id}`;
    return this._http.patch(url, modifiedUser);
  }
}
