import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: any;
  user: any;

  private _isLogged = new Subject<boolean>();
  isLogged$ = this._isLogged.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.auth = cookieService.get('auth');
    try {
      this.user = JSON.parse(cookieService.get('user'));
    } catch (error) {
      this.user = null;
    }

  }

  registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('users/register', user, httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  loginUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('users/login', user, httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  storeData(data) {
    this.auth = data.token;
    this.user = data.user;
    this._isLogged.next(true);
  }

  logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('users/logout', { user: this.user, token: this.auth }, httpOptions)
      .pipe(map((response: any) => {
        this._isLogged.next(false);
        return response;
      }));
  }

  getPersonalProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(`users/${this.user.username}`, httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public handleError(error: HttpErrorResponse | any) {
    return throwError(error);
  }
}
