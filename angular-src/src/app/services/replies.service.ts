import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reply } from '../models/models';
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
    return this.http.patch(`${environment.LINK}/replies/${reply.id}`, {
      reply,
      token
    });
  }

  deleteReply(reply: Reply, token: string) {
    return this.http.request('delete', `${environment.LINK}/replies/${reply.id}`, {
      body: {
        reply,
        token,
      }
    });
  }
}
