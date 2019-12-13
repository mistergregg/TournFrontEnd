import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService, UserResponse } from 'src/app/service/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = new FormControl('', [Validators.required, Validators.minLength(3)]);
  pass = new FormControl('', [Validators.required, Validators.minLength(4)]);
  hide = true;
  progressShow = false;
  tmpUser: User;
  loginText = "Login";

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  getUserErrorMessage() {
    return this.user.hasError('minlength') ? 'Username not valid' : '';
  }

  changeBackLogin() {
    this.loginText = "Login";
  }

  getPassErrorMessage() {
    return this.pass.hasError('minlength') ? 'Password not valid' : '';
  }

  buttonLogin() {

    if(!this.user.hasError('minlength') && this.user.value !== "")
    {
      if(!this.pass.hasError('minlength') && this.pass.value !== "")
      {
        this.progressShow = true;

        const userS = this.user.value;
        const passS = this.pass.value;

        let signUp: Observable<UserResponse>;
        signUp = this.authService.login(userS, passS);

        signUp.subscribe(resData => {
              this.progressShow = false;

              if (resData.token)
              {
                this.router.navigate(['']);
              }

              this.loginText = "Username or Password Invalid!";
        }, error => {
              this.loginText = "Could not connect to server";
              this.progressShow = false;
        });
      }
    }
  }
}
