import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { User, Cookies } from 'src/app/models/models';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question;
  @Input() action;

  constructor(
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute

  ) { }
  user: User;

  ngOnInit() {
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
