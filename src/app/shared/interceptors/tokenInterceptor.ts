import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private _authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // Jwt token is added in authorization header
        let currentUser = this._authenticationService.curentLoggedUserValue;
        if (currentUser && currentUser.token) {
            console.log("Hello");
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}