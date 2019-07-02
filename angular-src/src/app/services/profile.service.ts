import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserQuestions(user) {
    return this.http.get(`http://localhost:3000/questions/user/${user.id}`)
      .pipe(map(response => {
        return response;
      }));
  }
}
