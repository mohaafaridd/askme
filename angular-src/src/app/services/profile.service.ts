import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserQuestions(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(`http://localhost:3000/questions/user/${user.id}`, httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getUserReplies(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(`http://localhost:3000/replies/user/${user.id}`, httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
