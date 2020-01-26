import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IBooking } from 'src/app/shared/interfaces/IBooking';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/shared/services/reservation.service';

@Component({
  selector: 'app-booking-modification-modal',
  templateUrl: './booking-modification-modal.component.html',
  styleUrls: ['./booking-modification-modal.component.scss']
})
export class BookingModificationModalComponent implements OnInit {
  @Input() booking: IBooking = null;
  @Output() savedModifications = new EventEmitter<number>(); //Passed current user id

  public bookingForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private _reservationService: ReservationService) {
      this._initBookingForm();
  }

  ngOnInit() {
    this._initBookingForm();
  }

  private _initBookingForm() {
    this.bookingForm = this._formBuilder.group({
      movieId: [(this.bookingForm) ? (this.booking.movieId) : '', Validators.required],
      reservedSeats: [(this.bookingForm) ? (this.booking.reservedSeats) : '', Validators.required],
      date: [(this.bookingForm) ? (this.booking.date) : '', Validators.required],
      time: [(this.bookingForm) ? (this.booking.time) : '', Validators.required]
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  saveChanges() {
    const modifiedBooking: IBooking = {
      id: this.booking.id,
      movieId: this.bookingForm.get('movieId').value,
      reservedSeats: this.bookingForm.get('reservedSeats').value,
      userId: this.booking.userId,
      date: this.bookingForm.get('date').value,
      time: this.bookingForm.get('time').value
    }
    this._reservationService.saveBookingModifications(modifiedBooking)
      .subscribe(res => {
        this.activeModal.close();
        this.savedModifications.emit(this.booking.userId);
      });
  }
}
