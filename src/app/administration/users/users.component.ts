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
  }

  public getUpdatedUser(id: number) {
    this._usersService.getUserById(id)
      .subscribe(user => {
        this.selectedUser = user;
      });
  }

  public deleteReservation(reservation: IReservation) {
    this.loading = true;
    this._reservationService.removeReservation(reservation.id)
      .subscribe(res => {
        this.getUpdatedUser(this.selectedUser.id);
        this._initUsers();
        this.loading = false;
      });
  }
}
