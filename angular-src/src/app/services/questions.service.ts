import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  postQuestion(questioner: User, asked: User, question: string, token: string) {
    return this.http.post(`${environment.LINK}/questions/create`, {
      questioner: questioner._id,
      asked: asked._id,
      question,
      token
    });
  }
}
