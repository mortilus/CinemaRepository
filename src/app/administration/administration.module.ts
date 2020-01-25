import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { Routes, RouterModule } from '@angular/router';
import { BookingModificationModalComponent } from './users/booking-modification-modal/booking-modification-modal.component';
import { BookingSettingsModalComponent } from './users/booking-settings-modal/booking-settings-modal.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [UsersComponent, BookingModificationModalComponent, BookingSettingsModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [
    BookingModificationModalComponent,
    BookingSettingsModalComponent
  ]
})
export class AdministrationModule { }
