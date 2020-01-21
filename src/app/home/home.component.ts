import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MoviesService } from '../shared/services/movies.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IMovie } from '../shared/models/IMovie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('movieSearchId', { static: true }) movieFilter: ElementRef;

  public movies: IMovie[] = [];
  public bestRatedMovies: IMovie[] = [];
  public movieSearch: string = '';
  public page: number = 1;
  public itemsPerPage: number = 12;

  constructor(private _moviesService: MoviesService, private _router: Router) { }

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

  showMovieDetails(id: number) {
    this._router.navigate(['/home/movies/'+id]);
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
