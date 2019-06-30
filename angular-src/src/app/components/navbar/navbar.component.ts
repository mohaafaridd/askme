import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = this.cookieService.get('auth') ? true : false;

  condition = true;
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private cookieService: CookieService) {
    this.authService.isLogged$.subscribe(data => {
      this.isLoggedIn = data;
    });
  }

  getProfile() {
    this.router.navigate([`${this.authService.user.username}`]);
  }

  logout() {
    this.authService.logout().subscribe(data => {
      this.cookieService.delete('auth');
      this.cookieService.delete('user');
      this.notificationService.open(`You've logged out`, 'x', 2000);
      this.router.navigate(['/']);
    }, err => {
      this.notificationService.open(`Error Logging out`, 'x', 2000);
    });
  }

  ngOnInit() {
  }

}
