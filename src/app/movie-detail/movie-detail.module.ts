import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BookingSystemComponent } from './booking-system/booking-system.component';
import { FooterComponent } from './footer/footer.component';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { TrailerModalComponent } from './trailer-modal/trailer-modal.component';

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
