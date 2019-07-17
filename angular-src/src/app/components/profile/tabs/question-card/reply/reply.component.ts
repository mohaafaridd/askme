import { Component, OnInit, Input } from '@angular/core';
import { RepliesService } from 'src/app/services/replies.service';
import { CustomResponse, Reply } from 'src/app/models/models';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  @Input() replyId;
  @Input() action;

  reply: Reply = {
    createdAt: '',
    content: '',
    question: 1,
    id: 0,
    by: {
      firstName: '',
      middleName: '',
      username: '',
    }
  };

  isCurrentUser = true;
  constructor(private repliesService: RepliesService) {

  }

  ngOnInit() {
    this.repliesService.getReply(this.replyId).subscribe((response: CustomResponse) => {
      this.reply = response.reply;
    });
  }

}
