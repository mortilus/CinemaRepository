import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { Routes, RouterModule } from '@angular/router';
import { BookingModificationModalComponent } from './users/booking-modification-modal/booking-modification-modal.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [UsersComponent, BookingModificationModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [
    BookingModificationModalComponent
  ]
})
export class AdministrationModule { }
