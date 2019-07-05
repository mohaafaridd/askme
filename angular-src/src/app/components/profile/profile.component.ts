import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User, Question, Reply, Cookies, CustomResponse } from 'src/app/models/models';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  socket;

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

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private profileService: ProfileService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    // Watch from route changes to reload component
    this.activeRoute.params.subscribe(routeParams => {

      console.log('url slice', this.router.url.slice(1));

      // console.log('routeParams', params);

      // Set Profile Information
      this.setProfile();

      // Getting Questions
      this.setQuestions(routeParams['username']);

      // Getting Replies
      this.setReplies(routeParams['username']);
    });

    this.asyncQuestionsSocket();

    this.asyncRepliesSocket();

  }

  asyncQuestionsSocket() {
    this.socket.on('newQuestion', () => {
      const { params } = this.activeRoute.snapshot;
      this.setQuestions(params['username']);
      this.notificationService.open(`${this.user.firstName} added a new question 🎉🎉`, 'x', 3000);
    });
  }

  asyncRepliesSocket() {
    this.socket.on('newReply', () => {
      const { params } = this.activeRoute.snapshot;
      this.setReplies(params['username']);
      this.notificationService.open(`${this.user.firstName} replied to a question 🎉🎉`, 'x', 3000);
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

}
