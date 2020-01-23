import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { IMovie } from 'src/app/shared/models/IMovie';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public movies: IMovie[] = [];

  constructor(private _router: Router, private _movieService: MoviesService) { }

  ngOnInit() {
    this._movieService.getMovies('', 1, 6)
      .subscribe(res => this.movies = res);
  }

  showMovieDetails(movieId: number) {
      this._router.navigate(['/home/movies/' + movieId]); 
  }

}
