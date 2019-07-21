import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';
import { CustomResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private userSubject = new ReplaySubject();
  private questionsSubject = new ReplaySubject();
  private repliesSubject = new ReplaySubject();
  private pendingSubject = new ReplaySubject();

  user$ = this.userSubject.asObservable();
  questions$ = this.questionsSubject.asObservable();
  replies$ = this.repliesSubject.asObservable();
  pending$ = this.pendingSubject.asObservable();

  getUserProfile(username: string) {
    return this.http.get(`${environment.LINK}/users/${username}`).subscribe(
      (response: CustomResponse) => this.userSubject.next(response.user)
    );
  }

  getUserQuestions(username: string) {
    return this.http.get(`${environment.LINK}/questions/user/${username}`).subscribe(
      (response: CustomResponse) => {
        return this.questionsSubject.next(response.questions);
      }
    );
  }

  getUserReplies(username: string) {
    return this.http.get(`${environment.LINK}/questions/incoming/${username}?state=answered`).subscribe(
      (response: CustomResponse) => this.repliesSubject.next(response.questions)
    );
  }

  getUserPindingQuestions(username: string) {
    return this.http.get(`${environment.LINK}/questions/incoming/${username}?state=pending`).subscribe(
      (response: CustomResponse) => this.pendingSubject.next(response.questions)
    );
  }


}
