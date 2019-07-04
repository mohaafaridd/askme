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
}
