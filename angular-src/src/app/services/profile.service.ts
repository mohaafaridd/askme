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
    return this.http.get(`http://localhost:3000/users/${username}`);
  }

  getUserQuestions(username: string) {
    return this.http.get(`http://localhost:3000/questions/user/${username}`);
  }

  getUserReplies(username: string) {
    return this.http.get(`http://localhost:3000/replies/user/${username}`);
  }
}
