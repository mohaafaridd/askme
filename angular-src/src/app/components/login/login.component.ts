import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomResponse, User, CustomError } from 'src/app/models/models';
import { environment } from 'src/environments/environment';

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

      console.log(environment.EXP_DATE);

      this.cookieService.set('token', response.token, environment.EXP_DATE);

      this.cookieService.set('user', stringUser, environment.EXP_DATE);

      this.notificationService.open(`Welcome Back ${user.firstName} 🙌🙌`, 'x', environment.NOTIFICATION_TIME);

      this.router.navigate(['/']);
    }, (error) => {

      const errorObject: CustomError = error.error;
      this.notificationService.open(`${errorObject.message}`, 'x', environment.NOTIFICATION_TIME);

    });
  }

  ngOnInit() {
  }

}
