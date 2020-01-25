import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IBooking } from 'src/app/shared/models/IBooking';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-modification-modal',
  templateUrl: './booking-modification-modal.component.html',
  styleUrls: ['./booking-modification-modal.component.scss']
})
export class BookingModificationModalComponent implements OnInit {
  @Input() booking: IBooking = null;

  public bookingForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder) {
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
}
