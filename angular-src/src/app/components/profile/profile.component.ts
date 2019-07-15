import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
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

