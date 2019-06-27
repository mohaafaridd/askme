import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post('http://localhost:3000/users/register', user)
      .pipe(map((response: any) => {
        return response.data.json();
      }));
  }

}
