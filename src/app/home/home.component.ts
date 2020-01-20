import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../shared/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // public images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  public movies: any[] = [];

  constructor(private _moviesService: MoviesService) { }

  ngOnInit() {
    this._moviesService.getMovies()
      .subscribe(res => this.movies = res);
  }

}
