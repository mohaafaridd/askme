import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User, Question, Reply, Cookies, CustomResponse, CustomError } from 'src/app/models/models';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
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
    username: '',
    _id: '',
  };

  questions: Array<Question>;
  hasQuestions: boolean;

  answeredQuestions: Array<Question>;
  hasAnsweredQuestions: boolean;

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
    public dialog: MatDialog,
    private profileService: ProfileService,
  ) {
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
      this.setAnsweredQuestions(routeParams.username);

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
      console.log('updated');
      const { params } = this.activeRoute.snapshot;
      this.setAnsweredQuestions(params.username);
      this.setQuestions(params.username);
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

    this.profileService.getUserProfile(this.user.username, 'username').subscribe((response: CustomResponse) => {
      this.user = response.user;
    });
  }

  setQuestions(username: string) {
    this.profileService.getUserQuestions(username).subscribe((response: CustomResponse) => {
      // Reversed to get latest first
      let counter = 1;

      if (!response.questions) {

        return;
      }

      this.questions = response.questions
        .map(question => {
          question.id = counter++;
          return question;
        })
        .reverse();

      this.hasQuestions = this.questions.length > 0;

      this.setActions(username);
    });
  }

  setAnsweredQuestions(username: string) {
    this.profileService.getUserAnsweredQuestions(username).subscribe((response: CustomResponse) => {
      let counter = 1;

      const { questions } = response;

      this.answeredQuestions = questions.map(question => {
        question.id = counter++;
        return question;
      }).reverse();

      this.hasAnsweredQuestions = this.answeredQuestions.length > 0;

      this.setActions(username);
    });
  }

  setPending(username: string) {
    this.profileService.getUserPindingQuestions(username).subscribe((response: CustomResponse) => {
      this.pendingQuestions = response.questions;

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
          state: this.hasAnsweredQuestions,
          message: `${this.user.firstName} didn\'t reply to any questions!`,
          data: this.answeredQuestions,
          options: {
            primary: {
              access: false,
              ico: 'edit',
              functionality: 'edit'
            },
            secondary: {
              access: true,
              ico: 'delete',
              functionality: 'delete'
            },
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
            primary: {
              access: true,
              ico: 'edit',
              functionality: 'edit'
            },
            secondary: {
              access: true,
              ico: 'delete',
              functionality: 'delete'
            },
          }
        },
      }, {
        label: 'Pending Questions',
        pending: true,
        isAuthorized: this.checkUser(username),
        found: {
          state: this.hasPendingQuestions,
          message: 'You don\'t have any pending questions!',
          data: this.pendingQuestions,
          options: {
            primary: {
              access: true,
              ico: 'reply',
              functionality: 'reply'
            },
            secondary: {
              access: true,
              ico: 'delete',
              functionality: 'delete'
            },
          }
        },
      },
    ];
  }

  submitQuestion() {

    const cookies: Cookies = this.cookieService.getAll();

    const token = cookies.token;

    const questioner: User = JSON.parse(cookies.user);

    const asked: User = this.user;

    this.questionService.postQuestion(questioner, asked, this.question, token).subscribe((response: CustomResponse) => {
      this.notificationService.open(`@${questioner.username} asked @${asked.username} a question 🎉🎉`, 'x', environment.NOTIFICATION_TIME);
    });

  }

  checkUser(username: string) {
    try {

      const cookies: Cookies = this.cookieService.getAll();

      if (!cookies.user) {
        return false;
      }

      const user: User = JSON.parse(cookies.user);

      return username === user.username;
    } catch (error) {

    }
  }

  openDialog(data, functionality, type): void {
    switch (functionality) {
      case 'reply': {
        const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            mode: functionality,
            question: data
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
        break;
      }

      case 'edit': {
        const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            mode: functionality,
            data,
            type
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
        break;
      }
    }



  }
}

