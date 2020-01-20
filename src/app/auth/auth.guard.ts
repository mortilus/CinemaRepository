import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _authenticationService: AuthService) { }

  //Checks if route can be activated --> user has to be authorized
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.curentLoggedUserValue;
    if (currentUser) {
        //User is authorized
        return true;
    } 

    //Not authorized
    this._router.navigate(['/login']);
    return false;
}
  
}
