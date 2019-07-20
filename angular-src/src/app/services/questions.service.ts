import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Question, CustomResponse } from '../models/models';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  private questionSubject = new ReplaySubject();
  question$ = this.questionSubject.asObservable();


  postQuestion(question: Question, token: string) {
    return this.http.post(`${environment.LINK}/questions/create`, {
      question,
      token
    });
  }

  getQuestion(id: number) {
    return this.http.get(`${environment.LINK}/questions/${id}`).subscribe(
      (response: CustomResponse) => this.questionSubject.next(response.question)
    );
  }

  patchQuestion(question: Question, token: string) {
    return this.http.patch(`${environment.LINK}/questions/${question.id}`, {
      question,
      token,
    });
  }

  deleteQuestion(question: Question, token: string) {
    return this.http.request('delete', `${environment.LINK}/questions/${question.id}`, {
      body: {
        question,
        token
      }
    });
  }
}
