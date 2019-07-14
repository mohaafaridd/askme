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
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // used to store a question asked by user, bounded to textarea in HTML
  question: string;

  user: User;

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
    const { username } = this.activeRoute.snapshot.params;

    try {
      const currentUser: User = JSON.parse(cookies.user);
      return this.user.username === currentUser.username;
    } catch (error) {
      return false;
    }
  }

  // setProfile() {
  //   const cookies: Cookies = this.cookieService.getAll();
  //   const routeParams = this.activeRoute.snapshot.params;

  //   this.user.username = routeParams.username;

  //   if (cookies.user) {
  //     const currentUser: User = JSON.parse(cookies.user);
  //     this.isMyProfile = this.user.username === currentUser.username ? true : false;
  //   } else {
  //     this.isMyProfile = false;
  //   }

  //   this.profileService.getUserProfile(this.user.username, 'username').subscribe((response: CustomResponse) => {
  //     this.user = response.user;
  //   });
  // }

  // setQuestions(username: string) {
  //   this.profileService.getUserQuestions(username).subscribe((response: CustomResponse) => {
  //     this.questions = response.questions.reverse();

  //     this.hasQuestions = this.questions.length > 0;

  //     this.setActions(username);
  //   });
  // }

  // setAnsweredQuestions(username: string) {
  //   this.profileService.getUserAnsweredQuestions(username).subscribe((response: CustomResponse) => {

  //     const { questions } = response;

  //     this.answeredQuestions = questions.reverse();

  //     this.hasAnsweredQuestions = this.answeredQuestions.length > 0;

  //     this.setActions(username);
  //   });
  // }

  // setPending(username: string) {
  //   this.profileService.getUserPindingQuestions(username).subscribe((response: CustomResponse) => {
  //     this.pendingQuestions = response.questions;

  //     this.hasPendingQuestions = this.pendingQuestions.length > 0;

  //     this.setActions(username);
  //   });
  // }

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

