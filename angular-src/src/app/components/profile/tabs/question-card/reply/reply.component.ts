import { Component, OnInit, Input } from '@angular/core';
import { RepliesService } from 'src/app/services/replies.service';
import { CustomResponse, Reply, Cookies, User } from 'src/app/models/models';
import { Options } from 'src/app/models/action.interface';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../../dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  @Input() replyId;

  options: Options;
  reply: Reply;

  constructor(
    private repliesService: RepliesService,
    private cookieService: CookieService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,

  ) {

  }

  ngOnInit() {

    this.repliesService.getReply(this.replyId).subscribe((response: CustomResponse) => {
      this.reply = response.reply;

      this.options = {

        primary: {
          access: this.isOwner(),
          icon: 'edit',
          functionality: 'edit'
        },
        secondary: {
          access: this.isOwner() || this.isCurrentUserProfile(),
          icon: 'delete',
          functionality: 'delete'
        }

      };
    });
  }


  isOwner() {
    const cookies: Cookies = this.cookieService.getAll();
    try {
      const user: User = JSON.parse(cookies.user);
      return this.reply.by._id === user._id;
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
