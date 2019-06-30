import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

condition = true;
  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router) {
    this.authService.isLogged$.subscribe(data => {
      console.log('login status', data);
      this.isLoggedIn = data
      console.log('login status', this.isLoggedIn);
      });
  }

  getProfile() {
    this.router.navigate([`${this.authService.user.username}`]);
  }

  logout() {
    this.authService.logout().subscribe(data => {
      this.notificationService.open(`You've logged out`, 'x', 2000);
      this.router.navigate(['/']);
    }, err => {
      this.notificationService.open(`Error Logging out`, 'x', 2000);
    });
  }

  ngOnInit() {
  }

}
