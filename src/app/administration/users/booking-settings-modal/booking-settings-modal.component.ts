import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IBookingSettings } from 'src/app/shared/models/IBooking';
import { BookingService } from 'src/app/shared/services/booking.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-settings-modal',
  templateUrl: './booking-settings-modal.component.html',
  styleUrls: ['./booking-settings-modal.component.scss']
})
export class BookingSettingsModalComponent implements OnInit {
  public bookingSettingsForm: FormGroup;
  public loadingBookingSettings: boolean = false;

  constructor(private _bookingService: BookingService, public activeModal: NgbActiveModal, private _formBuilder: FormBuilder) {
    this.bookingSettingsForm = this._formBuilder.group({
      maxAmountBooking: [0, Validators.required],
      pricePerTicket: [0, Validators.required]
    });
  }

  ngOnInit() {
    this._bookingService.getBookingSettings()
      .subscribe(res => {
        this.bookingSettingsForm = this._formBuilder.group({
          maxAmountBooking: [res.maximumAmountBookings, Validators.required],
          pricePerTicket: [res.pricePerTicket, Validators.required]
        });
      });
  }

  saveBookingSettings() {
    this.loadingBookingSettings = true;
    const modifiedBookingSettings: IBookingSettings = {
      maximumAmountBookings: this.bookingSettingsForm.get('maxAmountBooking').value,
      pricePerTicket: this.bookingSettingsForm.get('pricePerTicket').value
    };
    this._bookingService.updateBookingSettings(modifiedBookingSettings)
      .subscribe(res => {
        this.loadingBookingSettings = false;
        this.activeModal.close();
      });
  }
}
