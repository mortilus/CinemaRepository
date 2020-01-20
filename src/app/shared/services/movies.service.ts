import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getMovies(searchedMovie: string, page: number, limit: number) {
    var url: string = `${this._url}/movies`;
    if (searchedMovie && searchedMovie != '') {
      url = `${this._url}/movies?title_like=${searchedMovie}`;
    }
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());
    return this._http.get<any[]>(url, { params });
  }
  getHighestRatedMovies(page: number, limit: number) {
    var url: string = `${this._url}/movies?_sort=imdbRating&_order=desc&_page=${page}&_limit=${limit}`;
    return this._http.get<any[]>(url);
  }
}
