import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IReservation } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _url: string = '';

  constructor(
    private _mainService: MainService,
    private _http: HttpClient
  ) {
    this._url = this._mainService.getMainUrl();
  }

  getReservations() {
    return this._http.get<IReservation[]>(`${this._url}/reservations`);
  }

  removeReservation(id: number) {
    const url = `${this._url}/reservations/${id}`;
    return this._http.delete<any>(url);
  }
}