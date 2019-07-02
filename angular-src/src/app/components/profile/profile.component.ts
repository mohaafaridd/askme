import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    id: 0,
    firstName: '',
    middleName: '',
    createdAt: ''
  };

  questions: any;
  replies: any;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService) {

    this.authService.getPersonalProfile().subscribe(data => {
      this.user = data.user;

      this.profileService.getUserQuestions(this.user).subscribe(questions => {
        console.log(questions);
        this.questions = questions.questions;
      });

      this.profileService.getUserReplies(this.user).subscribe(replies => {
        console.log(replies);
        this.replies = replies.replies;
      });
    });

  }


  ngOnInit() {
  }

}
