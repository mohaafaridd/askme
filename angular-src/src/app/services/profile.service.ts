import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(username: string, term: string) {
    return this.http.get(`${environment.LINK}/users/${username}`);
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
