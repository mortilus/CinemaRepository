import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _url: string = '';

  constructor(private _mainService: MainService, private _http: HttpClient) {
    this._url = this._mainService.getMainUrl();
  }

  getUsers(embedReservations: boolean) {
    var url = `${this._url}/users`;
    if (embedReservations)
      url = `${url}?_embed=reservations`;
    return this._http.get<IUser[]>(url);
  }

  getUserById(id: number) {
    var url = `${this._url}/users/${id}?_embed=reservations`;
    return this._http.get<IUser>(url);
  }
}
