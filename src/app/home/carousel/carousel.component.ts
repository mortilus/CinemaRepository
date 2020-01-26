import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  public movies: any[] = [];

  constructor(private _movieService: MoviesService) { }

  ngOnInit() {
    this._movieService.getMovies('', 2, 4)
      .subscribe(list => {
        if(list.length > 2)
          this.movies = [...list];
      })
  }

}
