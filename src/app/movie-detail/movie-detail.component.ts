import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMovie } from 'src/app/shared/interfaces/IMovie';
import { ISeat } from 'src/app/shared/interfaces/ISeat';
import { IBookingSettings } from 'src/app/shared/interfaces/IBooking';
import { BookingService } from 'src/app/shared/services/booking.service';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { TrailerModalComponent } from './trailer-modal/trailer-modal.component';
import { DomSanitizer } from '@angular/platform-browser';

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
  public seatObj: ISeat = null;
  public booking: boolean = false;
  public fidelityCardNumber: string = '';
  public bookingSettings: IBookingSettings = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _moviesService: MoviesService,
    private _modalService: NgbModal,
    private _bookingService: BookingService,
    private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this._initBookingSettings();
    this._initMovie();
  }

  private _initMovie() {
    this.todayTimes = [];
    this.tomorrowTimes = [];
    this._activatedRoute.paramMap.subscribe(param => {
      if (this._activatedRoute.snapshot.params.id) {
        this._moviesService.getMovieById(this._activatedRoute.snapshot.params.id)
          .subscribe(res => {
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

  public timeSelected(time: { date: string, time: string }) {
    this.selectedTime = time;
    this._getMovieSeats();
  }
  
  private _getMovieSeats() {
    this._moviesService.getSeatsByMovieId(this.selectedMovie.id)
      .subscribe(res => {
        if (res[0])
          this.seatObj = res[0];
        const modalRef = this._modalService.open(BookingModalComponent, { centered: true, size: 'lg' });
        modalRef.componentInstance.selectedTime = this.selectedTime;
        modalRef.componentInstance.selectedMovie = this.selectedMovie;
        modalRef.componentInstance.seatObj = this.seatObj;
        modalRef.componentInstance.bookingSettings = this.bookingSettings;
      });
  }

  showTrailer() {
    const safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.selectedMovie.trailer);
    const modalRef = this._modalService.open(TrailerModalComponent, { size: 'lg' });
    modalRef.componentInstance.url = safeUrl;
  }
}
