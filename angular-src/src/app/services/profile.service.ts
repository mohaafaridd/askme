import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(username: string) {
    console.log('here', username);

    return this.http.get(`http://localhost:3000/users/${username}`);
  }

  getUserQuestions(user) {
    return this.http.get(`http://localhost:3000/questions/user/${user.id}`);
  }

  getUserReplies(user) {
    return this.http.get(`http://localhost:3000/replies/user/${user.id}`);
  }
}
