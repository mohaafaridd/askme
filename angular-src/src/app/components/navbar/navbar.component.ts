import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cookies, CustomResponse, CustomError } from 'src/app/models/models';

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

  getProfile() {
    // this.router.navigate([`${this.authService.user.username}`]);
  }

  logout() {
    const cookies: Cookies = this.cookieService.getAll();
    console.log('here', cookies);

    const user = JSON.parse(cookies.user);

    const { token } = cookies;

    this.authService.logoutUser(user, token).subscribe((response: CustomResponse) => {
      this.cookieService.delete('token');

      this.cookieService.delete('user');

      this.notificationService.open(`You've logged out`, 'x', 2000);

      this.router.navigate(['/']);
    }, (error) => {

      const errorObject: CustomError = error.error;
      this.notificationService.open('Error Logging out', 'x', 2000);

    });
  }

  ngOnInit() {
  }

}
