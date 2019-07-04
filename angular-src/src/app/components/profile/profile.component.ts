import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User, Question, Reply, Cookies, CustomResponse } from 'src/app/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    createdAt: '',
    firstName: '',
    id: 1,
    middleName: '',
    username: ''
  };
  noUser: boolean;

  questions: Array<Question>;
  noQuestions: boolean;

  replies: Array<Reply>;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private profileService: ProfileService) {
    // const cookies: Cookies = this.cookieService.getAll();

    this.user.username = this.router.url.slice(1);


    this.profileService.getUserProfile(this.user.username).subscribe((response: CustomResponse) => {
      this.user = response.user;

      // Getting Questions
      this.profileService.getUserQuestions(this.user).subscribe((questionResponse: CustomResponse) => {
        // Reversed to get latest first
        let counter = 1;

        this.questions = questionResponse.questions
          .map(question => {
            question.id = counter++;
            return question;
          })
          .reverse();

        if (this.questions.length === 0) {
          this.noQuestions = true;
        } else {
          this.noQuestions = false;
        }
      });

    });

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
