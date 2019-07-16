import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  @Input() reply;
  @Input() action;

  isCurrentUser = true;
  constructor() { }

  ngOnInit() {
    console.log(this.reply);
  }

}
