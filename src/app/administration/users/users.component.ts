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

  public selectUser(user: IUser) { //User was selected
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
        if(indexOldUser != -1) {
          this.selectedUser = user;
          this.users[indexOldUser] = this.selectedUser;
        }
      });
  }
}
