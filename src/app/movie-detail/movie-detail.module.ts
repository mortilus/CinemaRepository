import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BookingSystemComponent } from './movie-detail/booking-system/booking-system.component';
import { FooterComponent } from './movie-detail/footer/footer.component';
import { BookingModalComponent } from './movie-detail/booking-modal/booking-modal.component';
import { TrailerModalComponent } from './movie-detail/trailer-modal/trailer-modal.component';

const routes: Routes = [
  {
    path: ':id',
    component: MovieDetailComponent
  }
];

@NgModule({
  declarations: [MovieDetailComponent, BookingSystemComponent, FooterComponent, BookingModalComponent, TrailerModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [
    BookingModalComponent,
    TrailerModalComponent
  ]
})
export class MovieDetailModule { }
