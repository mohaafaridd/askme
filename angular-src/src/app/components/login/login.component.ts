import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private titleService: Title,
    private authService: AuthService,
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
      if (data.success) {
        this.authService.storeData(data);
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
  }

}