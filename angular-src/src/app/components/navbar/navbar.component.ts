import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cookies, CustomResponse, CustomError, User } from 'src/app/models/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;

  condition = true;
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private cookieService: CookieService) {
  }

  getLoginStatus() {
    return this.authService.isAuthenticated();
  }

  getProfile() {
    const cookies: Cookies = this.cookieService.getAll();
    const user: User = JSON.parse(cookies.user);
    this.router.navigate([`${user.username}`]);
  }

  logout() {
    const cookies: Cookies = this.cookieService.getAll();

    const user = JSON.parse(cookies.user);

    const { token } = cookies;

    this.authService.logoutUser(user, token).subscribe((response: CustomResponse) => {
      this.cookieService.delete('token');

      this.cookieService.delete('user');

      this.notificationService.open(`You've logged out 😥`, 'x', environment.NOTIFICATION_TIME);

      this.router.navigate(['/']);
    }, (error) => {

      const errorObject: CustomError = error.error;
      this.notificationService.open('Error Logging out', 'x', environment.NOTIFICATION_TIME);

    });
  }

  ngOnInit() {
  }

}
