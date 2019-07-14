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

  user$ = this.userSubject.asObservable();

  getUserProfile(username: string) {
    return this.http.get(`${environment.LINK}/users/${username}`).subscribe(
      (response: CustomResponse) => this.userSubject.next(response.user)
    );
  }

  getUserQuestions(username: string) {
    return this.http.get(`${environment.LINK}/questions/user/${username}`);
  }

  getUserPindingQuestions(username: string) {
    return this.http.get(`${environment.LINK}/questions/incoming/${username}?state=pinding`);
  }

  getUserAnsweredQuestions(username: string) {
    return this.http.get(`${environment.LINK}/questions/incoming/${username}?state=answered`);
  }

}
