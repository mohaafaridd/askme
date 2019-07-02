import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user';
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

  constructor(private authService: AuthService) {
    this.authService.getPersonalProfile().subscribe(data => {
      this.user = data.user;
    });
  }

  ngOnInit() {
  }

}
