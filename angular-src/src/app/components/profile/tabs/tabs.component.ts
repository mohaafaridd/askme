import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Action } from 'src/app/models/action.interface';
import { Cookies, User } from 'src/app/models/models';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  tabs: Array<Action>;

  constructor(
    private profileService: ProfileService,
    private cookieService: CookieService,
    private activeRoute: ActivatedRoute,
    private router: Router,

  ) {
    this.tabs = this.setTabOptions();
  }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      const lastEvent = e instanceof NavigationEnd;
      if (lastEvent) {
        this.tabs = this.setTabOptions();
      }
    });
  }

  get replies$() {
    return this.profileService.replies$;
  }

  get questions$() {
    return this.profileService.questions$;
  }

  get pending$() {
    return this.profileService.pending$;
  }

  setTabOptions(): Array<Action> {
    const output = [];

    const replies: Action = {
      label: 'Replies',
      authorized: true,
      data: this.replies$,
    };

    const questions: Action = {
      label: 'Questions',
      authorized: true,
      data: this.questions$,
    };

    const pending: Action = {
      label: 'Pending Questions',
      authorized: this.isCurrentUserProfile(),
      data: this.pending$,
    };

    output.push(replies, questions, pending);

    return output;
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
}
