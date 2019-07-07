import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User, Question, Reply, Cookies, CustomResponse } from 'src/app/models/models';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import { QuestionsService } from 'src/app/services/questions.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  socket;

  counter = 200;

  question;

  isMyProfile;

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

  unansweredQuestions: Array<Question>;
  noUnansweredQuestions: boolean;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private notificationService: NotificationService,
    private questionService: QuestionsService,
    private activeRoute: ActivatedRoute,
    private profileService: ProfileService) {
    this.socket = io(`${environment.LINK}`);
  }

  ngOnInit() {
    // Watch from route changes to reload component
    this.activeRoute.params.subscribe(routeParams => {

      // Set Profile Information
      this.setProfile();

      // Getting Questions
      this.setQuestions(routeParams['username']);

      // Getting Replies
      this.setReplies(routeParams['username']);

      // Getting Unanswered questions
      this.setUnanswered(routeParams['username']);

    });

    this.asyncQuestionsSocket();

    this.asyncRepliesSocket();

  }

  asyncQuestionsSocket() {
    this.socket.on('newQuestion', () => {
      const { params } = this.activeRoute.snapshot;
      this.setQuestions(params['username']);
      this.setUnanswered(params['username']);
    });
  }

  asyncRepliesSocket() {
    this.socket.on('newReply', () => {
      const { params } = this.activeRoute.snapshot;
      this.setReplies(params['username']);
      this.setUnanswered(params['username']);
    });
  }

  setProfile() {
    const cookies: Cookies = this.cookieService.getAll();
    const routeParams = this.activeRoute.snapshot.params;

    this.user.username = routeParams['username'];

    if (cookies.user) {
      const currentUser: User = JSON.parse(cookies.user);
      this.isMyProfile = this.user.username === currentUser.username ? true : false;
    } else {
      this.isMyProfile = false;
    }

    this.profileService.getUserProfile(this.user.username).subscribe((response: CustomResponse) => {
      this.user = response.user;
    });
  }

  setQuestions(username: string) {
    this.profileService.getUserQuestions(username).subscribe((response: CustomResponse) => {
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

  setReplies(username: string) {
    this.profileService.getUserReplies(username).subscribe((response: CustomResponse) => {
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

  setUnanswered(username: string) {
    this.profileService.getUserUnansweredQuestions(username).subscribe((response: CustomResponse) => {
      let counter = 1;

      this.unansweredQuestions = response.questions.map(question => {
        question.id = counter++;
        return question;
      })
        .reverse();

      if (this.unansweredQuestions.length === 0) {
        this.noUnansweredQuestions = true;
      } else {
        this.noUnansweredQuestions = false;
      }
      console.log('here', this.unansweredQuestions, this.noUnansweredQuestions);
    });
  }

  submitQuestion() {
    const cookies: Cookies = this.cookieService.getAll();

    const token = cookies.token;

    const asker: User = JSON.parse(cookies.user);

    const asked: User = this.user;

    this.questionService.postQuestion(asker, asked, this.question, token).subscribe((response: CustomResponse) => {
      console.log(response);
      this.notificationService.open(`@${asker.username} asked @${asked.username} a question 🎉🎉`, 'x', environment.NOTIFICATION_TIME);

    });

  }
}
