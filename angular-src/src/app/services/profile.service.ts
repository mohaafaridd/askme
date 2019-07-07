import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(username: string) {
    return this.http.get(`${environment.LINK}/users/${username}`);
  }

  getUserQuestions(username: string) {
    return this.http.get(`${environment.LINK}/questions/user/${username}`);
  }

  getUserUnansweredQuestions(username: string) {
    return this.http.get(`${environment.LINK}/questions/unanswered/${username}`);
  }

  getUserReplies(username: string) {
    return this.http.get(`${environment.LINK}/replies/user/${username}`);
  }
}
