import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IReservation } from 'src/app/shared/models/IUser';
import { UsersService } from 'src/app/shared/services/users.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';

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

  constructor(private _usersService: UsersService, private _reservationService: ReservationService) { }

  ngOnInit() {
    this._initUsers();
  }

  private _initUsers() {
    this._usersService.getUsers(true) //Embed reservations = true
      .subscribe(users => this.users = users);
  }

  public selectUser(user: IUser) {
    this.selectedUser = user;
    // console.log("USER: " + JSON.stringify(user));
    // this.userReservations = user.reservations;
    // debugger;
    // console.log("Selected user: " + JSON.stringify(this.selectUser));
  }

  public deleteReservation(reservation: IReservation) {
    this.loading = true;
    this._reservationService.removeReservation(reservation.id)
      .subscribe(res => {
        // this.selectedUser = null;
        this.selectUser(this.selectedUser);
        this._initUsers();
        this.loading = false;
      });
  }
}
