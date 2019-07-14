import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Question } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  postQuestion(question: Question, token: string) {
    return this.http.post(`${environment.LINK}/questions/create`, {
      question,
      token
    });
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
