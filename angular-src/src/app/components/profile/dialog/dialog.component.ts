import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Reply, Question, CustomResponse, Cookies } from 'src/app/models/models';
import { RepliesService } from 'src/app/services/replies.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  modes;
  input;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private repliesService: RepliesService,
    private questionsService: QuestionsService,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    console.log(data);
    this.modes = {
      edit: this.data.mode === 'edit',
      reply: this.data.mode === 'reply',
      delete: this.data.mode === 'delete'
    };

    if (this.modes.edit) {
      this.input = new FormControl(this.data.data.content, Validators.required);
    } else {
      this.input = new FormControl('', Validators.required);
    }
  }

  onSubmit() {
    const question: Question = this.data.question;
    const reply: Reply = {
      question: question.id,
      by: question.asked,
      content: this.input.value,
    };

    const cookies: Cookies = this.cookieService.getAll();

    const token = cookies.token;

    this.repliesService.postReply(reply, token).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onEditSubmit() {
    const { type, data } = this.data;
    const cookies: Cookies = this.cookieService.getAll();

    const token = cookies.token;

    if (type === 'reply') {
      const reply: Reply = {
        id: data.id,
        content: this.input.value,
        question: data.question,
        by: ''
      };
      this.repliesService.patchReply(reply, token).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      const question: Question = {
        id: data.id,
        asked: data.asked,
        content: this.input.value,
        questioner: data.questioner,
      }

      this.questionsService.patchQuestion(question, token).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  onDeleteSubmit() {
    const { type, data } = this.data;
    const cookies: Cookies = this.cookieService.getAll();

    const token = cookies.token;
    console.log(type, data, token);

    if (type === 'reply') {
      const reply: Reply = {
        id: data.id,
        content: this.input.value,
        question: data.question,
        by: ''
      };

      this.repliesService.deleteReply(reply, token).subscribe(() => {

      });
    }
  }

  onDeleteSubmit() {
    const { type, data } = this.data;
    const cookies: Cookies = this.cookieService.getAll();

    const token = cookies.token;
    console.log(type, data, token);

    if (type === 'reply') {
      const reply: Reply = {
        id: data.id,
        content: this.input.value,
        question: data.question,
        by: ''
      };

      this.repliesService.deleteReply(reply, token).subscribe(() => {

      });
    }
  }

  ngOnInit() {
  }

}
