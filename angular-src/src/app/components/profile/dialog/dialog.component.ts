import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Reply, Question, CustomResponse, Cookies } from 'src/app/models/models';
import { RepliesService } from 'src/app/services/replies.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private repliesService: RepliesService,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  reply = new FormControl('', Validators.required);

  onSubmit() {
    const question: Question = this.data.question;
    const userReply: Reply = {
      question: question.id,
      by: question.asked,
      content: this.reply.value,
    };

    const cookies: Cookies = this.cookieService.getAll();

    const token = cookies.token;

    this.repliesService.postReply(userReply, token).subscribe(() => {
      this.dialogRef.close();
    });
  }

  ngOnInit() {
  }

}
