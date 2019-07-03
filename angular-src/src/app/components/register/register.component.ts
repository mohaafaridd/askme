import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

// Interfaces
import { CustomResponse, CustomError } from 'src/app/models/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private titleService: Title,
    private authServices: AuthService,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    private router: Router) {
    this.titleService.setTitle('Register');
  }

  regexValues = {
    names: new RegExp(/^[a-zA-Z]+$/),
    username: new RegExp(/^\w([-.]?\w)+\w$/),
  };

  profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(this.regexValues.names),
      Validators.required
    ]),
    middleName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(this.regexValues.names),
      Validators.required
    ]),
    username: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(this.regexValues.username),
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.maxLength(100),
      Validators.required
    ]),
  });

  get firstName() {
    return this.profileForm.get('firstName');
  }
  get middleName() {
    return this.profileForm.get('middleName');
  }
  get username() {
    return this.profileForm.get('username');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get password() {
    return this.profileForm.get('password');
  }

  getErrorMessage(property) {
    const formProperty = this.profileForm.get(property);

    if (formProperty.hasError('required')) {
      return 'This field is required';
    }

    if (formProperty.hasError('email')) {
      return 'Email is invalid';
    }

    switch (property) {
      case 'firstName':
      case 'middleName':
        if (formProperty.hasError('minlength')) {
          return 'Minimum length is 2';
        } else if (formProperty.hasError('maxlength')) {
          return 'Maximum length is 15';
        } else if (formProperty.hasError('pattern')) {
          return 'This should contain characters only.';
        }
        break;

      case 'username':
        if (formProperty.hasError('minlength')) {
          return 'Minimum length is 2';
        } else if (formProperty.hasError('maxlength')) {
          return 'Maximum length is 15';
        } else if (formProperty.hasError('pattern')) {
          return 'This should contain characters and dots.';
        }
        break;

      case 'password':
        if (formProperty.hasError('minlength')) {
          return 'Minimum length is 6';
        } else if (formProperty.hasError('maxlength')) {
          return 'Maximum length is 100';
        }
        break;

      default:
        break;
    }
  }

  onSubmit() {
    this.authServices.registerUser(this.profileForm.value).subscribe((response: CustomResponse) => {

      this.cookieService.set('token', response.token, 30000);

      this.cookieService.set('user', JSON.stringify(response.user), 30000);

      this.notificationService.open('User has been registered and logged in', 'x', 2000);

      this.router.navigate(['/']);

    }, (error) => {

      const errorObject: CustomError = error.error;
      console.log(errorObject);
      this.notificationService.open(`${errorObject.message} because of ${errorObject.cause}`, 'x', 2000);

    });
  }

  ngOnInit() {
  }


}
