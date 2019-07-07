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

  // used to store a question asked by user, bounded to textarea in HTML
  question: string;

  isMyProfile;

  user: User = {
    createdAt: '',
    firstName: '',
    id: 1,
    middleName: '',
    username: ''
  };

  questions: Array<Question>;
  hasQuestions: boolean;

  replies: Array<Reply>;
  hasReplies: boolean;

  pendingQuestions: Array<Question>;
  hasPendingQuestions: boolean;

  actions;


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
      this.setQuestions(routeParams.username);

      // Getting Replies
      this.setReplies(routeParams.username);

      // Getting pending questions
      this.setPending(routeParams.username);

      this.setActions(routeParams.username);

    });

    this.asyncQuestionsSocket();

    this.asyncRepliesSocket();

  }

  asyncQuestionsSocket() {
    this.socket.on('newQuestion', () => {
      const { params } = this.activeRoute.snapshot;
      this.setQuestions(params.username);
      this.setPending(params.username);
    });
  }

  asyncRepliesSocket() {
    this.socket.on('newReply', () => {
      const { params } = this.activeRoute.snapshot;
      this.setReplies(params.username);
      this.setPending(params.username);
    });
  }

  setProfile() {
    const cookies: Cookies = this.cookieService.getAll();
    const routeParams = this.activeRoute.snapshot.params;

    this.user.username = routeParams.username;

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

      this.hasQuestions = this.questions.length > 0;

      console.log(this.questions);

      this.setActions(username);
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

      this.hasReplies = this.replies.length > 0;

      this.setActions(username);
    });
  }

  setPending(username: string) {
    this.profileService.getUserUnansweredQuestions(username).subscribe((response: CustomResponse) => {
      let counter = 1;
      console.log('here in question pending', response.question);

      this.pendingQuestions = response.questions.map(question => {
        question.id = counter++;
        return question;
      })
        .reverse();

      this.hasPendingQuestions = this.pendingQuestions.length > 0;

      this.setActions(username);
    });
  }

  setActions(username: string) {
    this.actions = [
      {
        label: 'Replies',
        isAuthorized: true,
        found: {
          state: this.hasReplies,
          message: `${this.user.firstName} didn\'t reply to any questions!`,
          data: this.replies,
          options: {
            primary: 'Edit',
            secondary: 'Delete'
          }
        },
      }, {
        label: 'Questions',
        isAuthorized: true,
        found: {
          state: this.hasQuestions,
          message: `${this.user.firstName} doesn\'t have any questions!`,
          data: this.questions,
          options: {
            primary: 'Edit',
            secondary: 'Delete'
          }
        },
      }, {
        label: 'Pending Questions',
        isAuthorized: this.checkUser(username),
        found: {
          state: this.hasPendingQuestions,
          message: 'You don\'t have any pending questions!',
          data: this.pendingQuestions,
          options: {
            primary: 'Answer',
            secondary: 'Ignore'
          }
        },
      },
    ];
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


  checkUser(username: string) {
    const cookies: Cookies = this.cookieService.getAll();

    const user: User = JSON.parse(cookies.user);

    return username === user.username;
  }
}
