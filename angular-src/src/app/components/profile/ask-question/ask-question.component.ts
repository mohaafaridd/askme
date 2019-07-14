import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { CookieService } from 'ngx-cookie-service';
import { Cookies, User, Question, CustomResponse, CustomError } from 'src/app/models/models';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd, Params } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private cookieService: CookieService,
    private router: Router,
    private questionsService: QuestionsService,
    private notificationService: NotificationService,
  ) { }

  user: User;

  question = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(200),
  ]);

  ngOnInit() {
  }

  bootstrap() {
    // this.isCurrentUser;
  }

  get user$() {
    return this.profileService.user$.pipe(map((user: User) => {
      this.user = user;
      return user;
    }));
  }

  get isCurrentUser() {
    const cookies: Cookies = this.cookieService.getAll();
    try {
      const currentUser: User = JSON.parse(cookies.user);
      return this.user.username === currentUser.username;
    } catch (error) {
      return false;
    }
  }

  getErrorMessage() {
    const errors = {
      required: this.question.hasError('required'),
      minLength: this.question.hasError('minlength'),
      maxLength: this.question.hasError('maxlength')
    };

    if (errors.required) {
      return 'Question is needed';
    } else if (errors.minLength) {
      return 'Question minimum length is 2 characters';
    } else if (errors.maxLength) {
      return 'Question maximum length is 200 characters';
    }
  }

  submitQuestion() {
    const cookies: Cookies = this.cookieService.getAll();

    try {
      const token = cookies.token;

      const questioner: User = JSON.parse(cookies.user);

      const asked: User = this.user;

      const question: Question = {
        content: this.question.value,
        asked: asked._id,
        questioner: questioner._id,
      };

      this.questionsService.postQuestion(question, token).subscribe((response: CustomResponse) => {
        this.question.setValue('');
        this.notificationService.open('Question sent!', 'cancel', environment.NOTIFICATION_TIME);
      }, (error: CustomError) => {
        this.notificationService.open('Failed sending question, are you logged in?', 'cancel', environment.NOTIFICATION_TIME);
      });

    } catch (error) {
      this.notificationService.open('Failed sending question, are you logged in?', 'cancel', environment.NOTIFICATION_TIME);
    }
  }
}
