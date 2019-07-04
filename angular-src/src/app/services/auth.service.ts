import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/models';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = true;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private cookies: CookieService) {
  }

  public isAuthenticated(): boolean {
    try {
      const token = this.cookies.get('token');
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      return false;
    }
  }

  registerUser(input: User) {
    return this.http.post('http://localhost:3000/users/register', { user: input });
  }

  loginUser(input: User) {
    return this.http.post('http://localhost:3000/users/login', { user: input });
  }

  logoutUser(input: User, token: string) {
    return this.http.post('http://localhost:3000/users/logout', { user: input, token });
  }

  /* 
    auth: string;
    user: User;
  
    // private _isLogged = new Subject<boolean>();
    // isLogged$ = this._isLogged.asObservable();
  
    constructor(private http: HttpClient, private cookieService: CookieService) {
      this.auth = cookieService.get('auth');
      try {
        this.user = JSON.parse(cookieService.get('user'));
      } catch (error) {
        this.user = null;
      }
  
    }
  
    registerUser(user: User) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      return this.http.post('http://localhost:3000/users/register', user, httpOptions)
        .pipe(map((response: any) => {
          return response;
        }));
  
      // return this.http.post('http://localhost:3000/users/register', user);
    }
  
    loginUser(user) {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json'
      //   })
      // };
  
      // return this.http.post('http://localhost:3000/users/login', user, httpOptions)
      //   .pipe(map((response: any) => {
      //     return response;
      //   }));
  
      const x = this.http.post('http://localhost:3000/users/login', user);
      console.log(x);
      return x;
    }
  
    storeData(data) {
      this.auth = data.token;
      this.user = data.user;
      this._isLogged.next(true);
    }
  
    logout() {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json'
      //   })
      // };
  
      // return this.http.post('http://localhost:3000/users/logout', { user: this.user, token: this.auth }, httpOptions)
      //   .pipe(map((response: any) => {
      //     this._isLogged.next(false);
      //     return response;
      //   }));
  
      return this.http.post('http://localhost:3000/users/logout', { user: this.user, token: this.auth });
    }
  
    getPersonalProfile() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      return this.http.get(`http://localhost:3000/users/${this.user.username}`, httpOptions)
        .pipe(map((response: any) => {
          return response;
        }));
  
      // return this.http.get(`http://localhost:3000/users/${this.user.username}`);
    } */
}
