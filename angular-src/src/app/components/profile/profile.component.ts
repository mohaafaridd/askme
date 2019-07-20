import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';

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
  }

  ngOnInit() {
    this.bootstrap();
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


}

