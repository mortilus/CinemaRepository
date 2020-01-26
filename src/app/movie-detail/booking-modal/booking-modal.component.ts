import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from 'src/app/shared/services/booking.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IBooking, IBookingSettings } from 'src/app/shared/models/IBooking';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/shared/models/IMovie';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent {
  @Input() selectedTime: { date: string, time: string };
  @Input() selectedMovie: IMovie;
  @Input() seatObj: { assigned: number, available: number };
  @Input() bookingSettings: IBookingSettings;

  public bookingForm: FormGroup;
  public seatsCounter: number = 0;
  public booking: boolean = false;
  public isCollapsed: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private _bookingService: BookingService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService) {
    this.bookingForm = this._formBuilder.group({
      firstName: [this._authService.curentLoggedUserValue.firstName, Validators.required],
      lastName: [this._authService.curentLoggedUserValue.lastName, Validators.required],
      birthDate: [this._authService.curentLoggedUserValue.birthDate, Validators.required],
      idNumber: ['', Validators.required],
      fedelityCardNumber: ['']
    });
  }

  public addSeat() {
    this.seatsCounter++;
  }
  public removeSeat() {
    this.seatsCounter--;
  }

  public book() {
    this.booking = true;
    const reservation: IBooking = {
      userId: this._authService.curentLoggedUserValue.id,
      movieId: this.selectedMovie.id,
      reservedSeats: this.seatsCounter,
      date: this.selectedTime.date,
      time: this.selectedTime.time
    }
    this._bookingService.bookMovieTickets(reservation)
      .subscribe(res => {
        this.seatsCounter = 0;
        this.booking = false;
        this.activeModal.close();
        this._router.navigate(['/home']);
      })
  }

  plusButtonDisabled(): boolean {
    if (this.seatsCounter >= this.bookingSettings.maximumAmountBookings) {
      return true;
    } else if (this.seatsCounter >= this.seatObj.available) {
      return true;
    }
    return false;
  }

  get bookinFormControls() { return this.bookingForm.controls }
}
