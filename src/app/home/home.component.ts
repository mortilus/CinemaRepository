import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MoviesService } from '../shared/services/movies.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('movieSearchId', { static: true }) movieFilter: ElementRef;

  public movies: any[] = [];
  public bestRatedMovies: any[] = [];
  public movieSearch: string = '';
  public page: number = 1;
  public itemsPerPage: number = 12;

  constructor(private _moviesService: MoviesService) { }

  ngOnInit() {
    this._getMoviesFiltered();
    this._getHighestRatedMovies();
  }

  private _getMoviesFiltered() {
    this._moviesService.getMovies(this.movieSearch, this.page, this.itemsPerPage)
      .subscribe(res => this.movies = res);
  }
  private _getHighestRatedMovies() {
    this._moviesService.getHighestRatedMovies(this.page, 4)
      .subscribe(res => this.bestRatedMovies = res);
  }

  ngAfterViewInit(): void {
    fromEvent(this.movieFilter.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(res => {
        this._getMoviesFiltered();
      })
  }
}
