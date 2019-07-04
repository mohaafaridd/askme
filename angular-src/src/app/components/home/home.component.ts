import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Cookies } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogged: boolean;

  constructor(
    private titleService: Title,
    private cookieService: CookieService,
    private authService: AuthService) {
    this.titleService.setTitle('Home');
  }

  ngOnInit() {
  }

}
