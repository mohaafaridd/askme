import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: HttpClient) {

  }

  registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/users/register', user, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  loginUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/users/login', user, httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  storeData(data) {
    this.authToken = data.token;
    this.user = data.user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
  }

  public handleError(error: HttpErrorResponse | any) {
    return throwError(error);
  }
}
