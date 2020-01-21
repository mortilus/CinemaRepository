import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BookingSystemComponent } from './movie-detail/booking-system/booking-system.component';

const routes: Routes = [
  {
    path: ':id',
    component: MovieDetailComponent
  }
];

@NgModule({
  declarations: [MovieDetailComponent, BookingSystemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MovieDetailModule { }
