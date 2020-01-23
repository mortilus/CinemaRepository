import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMovie } from 'src/app/shared/models/IMovie';
import { ISeat } from 'src/app/shared/models/ISeat';
import { IBooking, IBookingSettings } from 'src/app/shared/models/IBooking';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  public selectedMovie: IMovie = null;
  public todayTimes: string[] = [];
  public tomorrowTimes: string[] = [];
  public selectedTime: { date: string, time: string } = null;
  public isCollapsed: boolean = true;

  //Booking modal variables
  private _modalToOpen: any = null;
  public seatsCounter: number = 0;
  public seatObj: ISeat = null;
  public booking: boolean = false;
  public fidelityCardNumber: string = '';
  public bookingSettings: IBookingSettings = null;
  public bookingForm: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _moviesService: MoviesService,
    private _modalService: NgbModal,
    private _authService: AuthService,
    private _bookingService: BookingService,
    private _router: Router,
    private _formBuilder: FormBuilder) {
      this.bookingForm = this._formBuilder.group({
        firstName: [this._authService.curentLoggedUserValue.firstName, Validators.required],
        lastName:[this._authService.curentLoggedUserValue.lastName, Validators.required],
        birthDate: [this._authService.curentLoggedUserValue.birthDate, Validators.required],
        idNumber: ['', Validators.required],
        fedelityCardNumber: ['']
      });
  }

  ngOnInit() {
    this._initBookingSettings();
    this._initMovie();
  }

  private _initMovie() {
    this._activatedRoute.paramMap.subscribe(param => {
      if (this._activatedRoute.snapshot.params.id) {
        this._moviesService.getMovieById(this._activatedRoute.snapshot.params.id)
          .subscribe(res => {
            if (res)
              this.selectedMovie = res;
            res.showtimes.map(item => {
              item.showtimes.map(time => {
                if (time.date === 'today') {
                  this.todayTimes = time.times;
                } else {
                  this.tomorrowTimes = time.times;
                }
              })
            });
          })
      }
    });
  }
  private _initBookingSettings() {
    this._bookingService.getBookingSettings()
      .subscribe(bookingSettings => {
        this.bookingSettings = bookingSettings;
      });
  }

  public timeSelected(time: { date: string, time: string }, modal: any) {
    this.selectedTime = time;
    this._modalToOpen = modal;
    this._getMovieSeats();
  }
  private _getMovieSeats() {
    this._moviesService.getSeatsByMovieId(this.selectedMovie.id)
      .subscribe(res => {
        if (res[0])
          this.seatObj = res[0];
        this._modalService.open(this._modalToOpen, { size: 'lg' });
      });
  }

  public addSeat() {
    this.seatsCounter++;
  }
  public removeSeat() {
    this.seatsCounter--;
  }

  get bookinFormControls() { return this.bookingForm.controls }

  public book(modal: any) {
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
        modal.close();
        this._router.navigate(['/home']);
      })
  }

  plusButtonDisabled(): boolean {
    if(this.seatsCounter >= this.bookingSettings.maximumAmountBookings) {
      return true;
    } else if(this.seatsCounter >= this.seatObj.available) {
      return true;
    }
    return false;
  }

}
