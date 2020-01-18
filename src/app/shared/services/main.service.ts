import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private _mainUrl: string = "http://localhost:3000";

  constructor() { }

  getMainUrl(): string {
    return this._mainUrl;
  }
}
