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

  patchReply(reply: Reply, token: string) {
    console.log('patch', reply);
    return this.http.patch(`${environment.LINK}/replies/${reply.id}`, {
      reply,
      token
    });
  }
}
