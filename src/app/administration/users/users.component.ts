import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IUser, IReservation } from 'src/app/shared/models/IUser';
import { UsersService } from 'src/app/shared/services/users.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/shared/services/booking.service';
import { IBookingSettings, IBooking } from 'src/app/shared/models/IBooking';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BookingModificationModalComponent } from './booking-modification-modal/booking-modification-modal.component';
import { BookingSettingsModalComponent } from './booking-settings-modal/booking-settings-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('searchedUserId', { static: true }) userFilter: ElementRef;

  public users: IUser[] = [];
  public userReservations: IReservation[] = [];
  public selectedUser: IUser = null;
  public loading: boolean = false;
  public loadingBookingSettings: boolean = false;
  public searchedUser: string = '';
  public loadingUserModifications: boolean = false;

  selectedUserForm: FormGroup;
  bookingSettingsForm: FormGroup;

  constructor(
    private _usersService: UsersService,
    private _reservationService: ReservationService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private _bookingService: BookingService) {
    this.selectedUserForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      fedelityCardNumber: ['', Validators.required]
    });
    this.bookingSettingsForm = this._formBuilder.group({
      maxAmountBooking: ['', Validators.required],
      pricePerTicket: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._initUsers();
  }

  private _initUsers() {
    this._usersService.getUsers(true, this.searchedUser) //Embed reservations = true
      .subscribe(users => this.users = users);
  }

  public selectUser(user: IUser) { //When user is selected from the table
    this.selectedUserForm = this._formBuilder.group({
      firstName: [user.firstName],
      lastName: [user.lastName],
      birthDate: [user.birthDate],
      email: [user.email],
      password: [user.password],
      fedelityCardNumber: ['']
    });
    this.selectedUser = user;
  }

  //Reservation actions
  public deleteReservation(reservation: IReservation) {
    this.loading = true;
    this._reservationService.removeReservation(reservation.id)
      .subscribe(res => {
        this.getUpdatedUser(this.selectedUser.id);
        this.loading = false;
      });
  }
  public modifyUserReservation(reservation: IReservation) {
    const bookingModificationModalRef = this._modalService.open(BookingModificationModalComponent);
    bookingModificationModalRef.componentInstance.booking = {...reservation};
    bookingModificationModalRef.componentInstance.savedModifications
      .subscribe($event => {
        this.getUpdatedUser($event)
      });
  }

  public getUpdatedUser(id: number) { //Needed to update the single user in the users list
    this._usersService.getUserById(id)
      .subscribe(user => {
        this._updateUI(user);
      });
  }

  //Selected user form
  public saveUserChanges() {
    this.loadingUserModifications = true;
    const modifiedUser: IUser = {
      firstName: this.selectedUserForm.get('firstName').value,
      lastName: this.selectedUserForm.get('lastName').value,
      email: this.selectedUserForm.get('email').value,
      birthDate: this.selectedUserForm.get('birthDate').value,
      password: this.selectedUserForm.get('password').value,
      id: this.selectedUser.id,
      role: this.selectedUser.role,
      reservations: this.selectedUser.reservations
    }
    this._usersService.saveUserModifications(modifiedUser)
      .subscribe(res => {
        this._updateUI(modifiedUser);
        this.loadingUserModifications = false;
      });
  }
  public resetSelectedUserForm() {
    this.selectUser(this.selectedUser);
  }

  private _updateUI(user: IUser) {
    const indexOldUser = this.users.indexOf(this.selectedUser);
    if (indexOldUser != -1) {
      this.selectUser(user); //Update selecteduser + form
      this.users[indexOldUser] = this.selectedUser; //Update user with changes locally in the users list to update UI
    }
  }

  //Booking settings UI
  openBookingSettingsModal(modal: any) {
    this._modalService.open(BookingSettingsModalComponent);
  }

  ngAfterViewInit(): void {
    fromEvent(this.userFilter.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(res => {
        this.selectedUser = null;
        this._initUsers();
      })
  }
}
