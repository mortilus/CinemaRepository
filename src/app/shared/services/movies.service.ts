import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _url: string = '';

  constructor(private _http: HttpClient, private _mainService: MainService) {
    this._url = this._mainService.getMainUrl();
  }

  getMovies() {
    return this._http.get<any>(`${this._url}/movies`);
  }
}
