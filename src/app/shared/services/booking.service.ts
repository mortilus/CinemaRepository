import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IBooking, IBookingSettings } from '../interfaces/IBooking';

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

  updateBookingSettings(bookingSettings: IBookingSettings) {
    const url = `${this._url}/bookingsettings`;
    return this._http.patch(url, bookingSettings);
  }

  getBookingSettings() {
    const url = `${this._url}/bookingsettings`;
    return this._http.get<IBookingSettings>(url);
  }
}
