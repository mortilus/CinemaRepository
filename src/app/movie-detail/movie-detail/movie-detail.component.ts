import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  public selectedMovie: any = null;
  public todatyTimes: string[] = [];
  public tomorrowTimes: string[] = [];

  constructor(private _activatedRoute: ActivatedRoute, private _moviesService: MoviesService) { }

  ngOnInit() {
    this._initMovie();
  }

  private _initMovie() {
    this._activatedRoute.paramMap.subscribe(param => {
      if (this._activatedRoute.snapshot.params.id) {
        this._moviesService.getMovieById(this._activatedRoute.snapshot.params.id)
          .subscribe(res => {
            if (res)
              this.selectedMovie = res;
            res.showtimes.map(item => {
              item.showtimes.map(time => {
                if (time.date === 'today') {
                  this.todatyTimes = time.times;
                } else {
                  this.tomorrowTimes = time.times;
                }
              })
            });
          })
      }
    });
  }

}
