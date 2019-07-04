import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomResponse, User, CustomError } from 'src/app/models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.titleService.setTitle('Login');
  }

  profileForm = new FormGroup({
    input: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get input() {
    return this.profileForm.get('input');
  }

  get password() {
    return this.profileForm.get('password');
  }

  onSubmit() {
    const loginData = this.profileForm.value;

    this.authService.loginUser(loginData).subscribe((response: CustomResponse) => {
      const user: User = response.user;
      const stringUser = JSON.stringify(user);

      this.cookieService.set('token', response.token, 30000);

      this.cookieService.set('user', stringUser, 30000);

      this.notificationService.open(`${user.firstName} ${user.middleName} has logged in`, 'x', 20000);

      this.router.navigate(['/']);
    }, (error) => {

      const errorObject: CustomError = error.error;
      this.notificationService.open(`${errorObject.message}`, 'x', 2000);

    });
  }

  ngOnInit() {
  }

}
