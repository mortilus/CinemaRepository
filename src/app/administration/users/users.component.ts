import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IReservation } from 'src/app/shared/models/IUser';
import { UsersService } from 'src/app/shared/services/users.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: IUser[] = [];
  public userReservations: IReservation[] = [];
  public selectedUser: IUser = null;
  public loading: boolean = false;

  //Selected user form
  selectedUserForm: FormGroup;

  constructor(
    private _usersService: UsersService,
    private _reservationService: ReservationService,
    private _formBuilder: FormBuilder) {
    this.selectedUserForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      fedelityCardNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._initUsers();
  }

  private _initUsers() {
    this._usersService.getUsers(true) //Embed reservations = true
      .subscribe(users => this.users = users);
  }

  public selectUser(user: IUser) { //User was selected
    this.selectedUserForm = this._formBuilder.group({
      firstName: [user.firstName],
      lastName: [user.lastName],
      birthDate: [user.birthDate],
      email: [user.email],
      password: [user.password],
      fedelityCardNumber: ['vuoto']
    });
    this.selectedUser = user;
  }

  public deleteReservation(reservation: IReservation) {
    this.loading = true;
    this._reservationService.removeReservation(reservation.id)
      .subscribe(res => {
        this.getUpdatedUser(this.selectedUser.id);
        this.loading = false;
      });
  }

  public getUpdatedUser(id: number) { //Needed to update the single user in the users list
    this._usersService.getUserById(id)
      .subscribe(user => {
        const indexOldUser = this.users.indexOf(this.selectedUser);
        if (indexOldUser != -1) {
          this.selectUser(user); //Update selecteduser + form
          this.users[indexOldUser] = this.selectedUser; //Update user with changes locally in the users list to update UI
        }
      });
  }

  //Selected user form
  public saveUserChanges() {

  }
  public resetSelectedUserForm() {
    this.selectUser(this.selectedUser);
  }
}
