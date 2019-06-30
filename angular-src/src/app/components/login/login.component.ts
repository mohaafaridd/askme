import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    const user = this.profileForm.value;

    this.authService.loginUser(user).subscribe(data => {
      if (data) {
        this.cookieService.set('auth', data.token, 30000);
        this.cookieService.set('user', JSON.stringify(data.user), 30000);

        this.authService.storeData(data);
        this.notificationService.open(`${data['user']['username']} has logged in`, 'x', 2000);
        this.router.navigate(['/']);
      }
    }, (err) => {
      console.log(err);
      this.notificationService.open(`Login failed`, 'x', 2000);
    });
  }

  ngOnInit() {
  }

}
