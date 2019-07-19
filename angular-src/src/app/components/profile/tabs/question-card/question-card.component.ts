import { Component, OnInit, Input } from '@angular/core';
import { User, Cookies } from 'src/app/models/models';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { Options } from 'src/app/models/action.interface';

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

  ngOnInit() {
    this.options = {

      primary: {
        access: this.isOwner() || this.isCurrentUserProfile(),
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
