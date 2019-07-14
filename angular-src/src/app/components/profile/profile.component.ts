import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User, Question, Reply, Cookies, CustomResponse, CustomError } from 'src/app/models/models';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { map } from 'rxjs/operators';
import { Action } from 'src/app/models/action.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // used to store a question asked by user, bounded to textarea in HTML
  question: string;

  user: User = { _id: '', firstName: '', id: 1, createdAt: '', middleName: '', username: '' };

  questions: Array<Question>;
  hasQuestions: boolean;

  answeredQuestions: Array<Question>;
  hasAnsweredQuestions: boolean;

  pendingQuestions: Array<Question>;
  hasPendingQuestions: boolean;

  actions: Array<Action> = [];

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private questionService: QuestionsService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    private profileService: ProfileService,
  ) {
    this.bootstrap();
  }

  ngOnInit() {

    this.router.events.subscribe((e: any) => {
      const lastEvent = e instanceof NavigationEnd;
      if (lastEvent) {
        this.bootstrap();
      }
    });
  }

  bootstrap() {
    const { username } = this.activeRoute.snapshot.params;
    this.profileService.getUserProfile(username);
    this.profileService.getUserQuestions(username);
    this.profileService.getUserReplies(username);
    this.profileService.getUserPindingQuestions(username);
  }

  get user$() {
    return this.profileService.user$.pipe(map((user: User) => {
      this.user = user;
      return user;
    }));
  }

  get questions$() {
    return this.profileService.questions$.pipe(map((questions: Array<Question>) => {
      this.questions = questions;

      const action: Action = {
        // Tab name
        label: 'Questions',
        // action visiblity in HTML
        authorized: true,
        // State of having questions
        state: questions.length > 0,
        // Displayed message
        message: questions.length > 0 ? 'Questions Found' : 'Not questions were found',
        // Available data, reversed to show latest first
        data: questions.reverse(),
        // Available buttons
        options: {
          primary: {
            // main button access
            access: true,
            icon: 'edit',
            functionality: 'edit'
          },
          seconadry: {
            // sub button access
            access: true,
            icon: 'delete',
            functionality: 'delete'
          }
        }
      };

      this.actions.push(action);
      console.log(this.actions.length);
      return questions;
    }));
  }

  get replies$() {
    return this.profileService.replies$.pipe(map((questions: Array<Question>) => {
      this.answeredQuestions = questions;
      return questions;
    }));
  }

  get pinding$() {
    return this.profileService.pinding$.pipe(map((questions: Array<Question>) => {
      this.answeredQuestions = questions;
      return questions;
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

  // setActions() {
  //   this.actions = [
  //     {
  //       label: 'Replies',
  //       isAuthorized: true,
  //       found: {
  //         state: this.hasAnsweredQuestions,
  //         message: `${this.user$} didn\'t reply to any questions!`,
  //         data: this.answeredQuestions,
  //         options: {
  //           primary: {
  //             access: false,
  //             ico: 'edit',
  //             functionality: 'edit'
  //           },
  //           secondary: {
  //             access: true,
  //             ico: 'delete',
  //             functionality: 'delete'
  //           },
  //         }
  //       },
  //     }, {
  //       label: 'Questions',
  //       isAuthorized: true,
  //       found: {
  //         state: this.hasQuestions,
  //         message: `${this.user$} doesn\'t have any questions!`,
  //         data: this.questions,
  //         options: {
  //           primary: {
  //             access: true,
  //             ico: 'edit',
  //             functionality: 'edit'
  //           },
  //           secondary: {
  //             access: true,
  //             ico: 'delete',
  //             functionality: 'delete'
  //           },
  //         }
  //       },
  //     }, {
  //       label: 'Pending Questions',
  //       pending: true,
  //       isAuthorized: this.isCurrentUser,
  //       found: {
  //         state: this.hasPendingQuestions,
  //         message: 'You don\'t have any pending questions!',
  //         data: this.pendingQuestions,
  //         options: {
  //           primary: {
  //             access: true,
  //             ico: 'reply',
  //             functionality: 'reply'
  //           },
  //           secondary: {
  //             access: true,
  //             ico: 'delete',
  //             functionality: 'delete'
  //           },
  //         }
  //       },
  //     },
  //   ];
  // }

  submitQuestion() {

    console.log('here');

    // const cookies: Cookies = this.cookieService.getAll();

    // const token = cookies.token;

    // const questioner: User = JSON.parse(cookies.user);

    // const asked: User = this.user;

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

      case 'delete': {
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

