import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User, Question, Reply, Cookies, CustomResponse } from 'src/app/models/models';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  socket;

  user: User = {
    createdAt: '',
    firstName: '',
    id: 1,
    middleName: '',
    username: ''
  };
  noUser: boolean;

  questions: Array<Question>;
  noQuestions: boolean;

  replies: Array<Reply>;
  noReplies: boolean;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private notificationService: NotificationService,
    private profileService: ProfileService) {
    this.socket = io('http://localhost:3000');

    this.user.username = this.router.url.slice(1);

    this.profileService.getUserProfile(this.user.username).subscribe((response: CustomResponse) => {
      this.user = response.user;

      // Getting Questions
      this.getQuestions();

      // Getting Replies
      this.getReplies();

    });
  }


  ngOnInit() {
    this.socket.on('newQuestion', () => {
      this.getQuestions();
      this.notificationService.open(`${this.user.firstName} added a new question 🎉🎉`, 'x', 3000);
    });
  }

  getQuestions() {
    this.profileService.getUserQuestions(this.user).subscribe((response: CustomResponse) => {
      // Reversed to get latest first
      let counter = 1;

      this.questions = response.questions
        .map(question => {
          question.id = counter++;
          return question;
        })
        .reverse();

      if (this.questions.length === 0) {
        this.noQuestions = true;
      } else {
        this.noQuestions = false;
      }
    });
  }

  getReplies() {
    this.profileService.getUserReplies(this.user).subscribe((response: CustomResponse) => {
      let counter = 1;

      this.replies = response.replies
        .map(reply => {
          reply.id = counter++;
          return reply;
        })
        .reverse();

      if (this.replies.length === 0) {
        this.noReplies = true;
      } else {
        this.noReplies = false;
      }
    });
  }

}
