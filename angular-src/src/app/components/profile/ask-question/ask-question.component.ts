import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { CookieService } from 'ngx-cookie-service';
import { Cookies, User } from 'src/app/models/models';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private cookieService: CookieService,
    private router: Router,

  ) { }

  user: User;

  ngOnInit() {
  }

  bootstrap() {
    // this.isCurrentUser;
  }

  get user$() {
    return this.profileService.user$.pipe(map((user: User) => {
      this.user = user;
      return user;
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
}
