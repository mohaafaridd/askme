import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User, Question, Reply, Cookies } from 'src/app/models/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  questions: Array<Question>;
  replies: Array<Reply>;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private profileService: ProfileService) {

    const cookies: Cookies = this.cookieService.getAll();

    this.user = JSON.parse(cookies.user);



    /* this.authService.getPersonalProfile().subscribe(data => {
      this.user = data.user;

      this.profileService.getUserQuestions(this.user).subscribe(questions => {
        console.log(questions);
        this.questions = questions.questions;
      });

      this.profileService.getUserReplies(this.user).subscribe(replies => {
        console.log(replies);
        this.replies = replies.replies;
      });
    }); */

  }


  ngOnInit() {
  }

}
