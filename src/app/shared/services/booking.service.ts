import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IBooking } from '../models/IBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _url: string = '';

  constructor(private _mainService: MainService, private _http: HttpClient) {
    this._url = this._mainService.getMainUrl();
  }

  bookMovieTickets(reservation: IBooking) {
    const url = `${this._url}/reservations`;
    return this._http.post(url, reservation);
  }
}
