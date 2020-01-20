import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    component: MovieDetailComponent
  }
];

@NgModule({
  declarations: [MovieDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MovieDetailModule { }
