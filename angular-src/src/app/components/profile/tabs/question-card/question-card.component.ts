import { Component, OnInit, Input } from '@angular/core';
import { User, Cookies, Question } from 'src/app/models/models';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { Options } from 'src/app/models/action.interface';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question;
  @Input() label;

  constructor(
    private cookieService: CookieService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,

  ) { }
  user: User;
  options: Options;
  isQuestions: boolean;

  ngOnInit() {
    this.isQuestions = this.label === 'Questions';
    this.options = {

      primary: {
        access: this.isOwner() || this.isPindingQuestion(this.label),
        icon: this.getIconAndFunction(this.label),
        functionality: this.getIconAndFunction(this.label)
      },
      secondary: {
        access: this.isOwner() || this.isCurrentUserProfile(),
        icon: 'delete',
        functionality: 'delete'
      }

    };
  }

  isOwner() {
    const cookies: Cookies = this.cookieService.getAll();
    try {
      const user: User = JSON.parse(cookies.user);
      console.log('here', user, this.question);
      return this.question.questioner._id === user._id;
    } catch (error) {
      return false;
    }
  }

  isCurrentUserProfile() {
    const cookies: Cookies = this.cookieService.getAll();
    const { username } = this.activeRoute.snapshot.params;
    try {
      const currentUser: User = JSON.parse(cookies.user);
      return username === currentUser.username;
    } catch (error) {
      return false;
    }
  }

  getIconAndFunction(label: string) {
    switch (label) {
      case 'Replies':
      case 'Questions':
        return 'edit';
        break;

      case 'Pinding Questions':
        return 'reply';
        break;
    }
  }

  isPindingQuestion(label: string) {
    if (label === 'Pinding Questions') {
      return true;
    }

    return false;
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

  copyQuestionLink(question: Question) {
    console.log(question.id);
  }
}
