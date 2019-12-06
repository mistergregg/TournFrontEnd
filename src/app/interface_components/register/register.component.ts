import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { User } from '../../model/user.model';
import validate = WebAssembly.validate;
import { Router } from '@angular/router';
import { AuthenticationService, UserResponse } from 'src/app/service/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  tmpUser: User;

  first = new FormControl('', [Validators.required, Validators.minLength(3)]);
  last = new FormControl('', [Validators.required, Validators.minLength(3)]);
  user = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);

  hide = true;
  progressShow = false;
  signUpText = "Register";

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  buttonSignUp()
  {
    if(!this.first.hasError('minlength') && this.first.value !== "")
    {
      if(!this.last.hasError('minlength') && this.last.value !== "")
      {
        if(!this.user.hasError('minlength') && this.user.value !== "")
        {
          if(!this.email.hasError('email') && this.email.value !== "")
          {
            if(!this.password.hasError('minlength') && this.password.value !== "")
            {
              this.progressShow = true;

              const firstS = this.first.value;
              const lastS = this.last.value;
              const userS = this.user.value;
              const emailS = this.email.value;
              const passS = this.password.value;

              let signUp: Observable<UserResponse>;
              signUp = this.authService.signUp(firstS, lastS, userS, emailS, passS);

              signUp.subscribe(resData => {
                this.progressShow = false;

                console.log(resData);

                if (resData.token)
                {
                  this.router.navigate(['']);
                }

                this.signUpText = "Username already in use!";
              }, error => {
                this.signUpText = "Could not connect to server";
                this.progressShow = false;
              });
            }
          }
        }
      }
    }
  }

  getFirstErrorMessage() {
    return this.first.hasError('minlength') ? 'Firstname not Long Enough' : '';
  }

  getLastErrorMessage() {
    return this.last.hasError('minlength') ? 'LastName not Long Enough' : '';
  }

  getUserErrorMessage() {
    return this.user.hasError('minlength') ? 'Username not Long Enough' : '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('minlength') ? 'Password not Long Enough' : '';
  }
}
