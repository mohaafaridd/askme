import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, Reply } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepliesService {

  constructor(private http: HttpClient) { }

  postReply(reply: Reply, token: string) {
    return this.http.post(`${environment.LINK}/replies/create`, { reply, token });
  }
}
