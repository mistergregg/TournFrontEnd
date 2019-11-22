import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/service/authentication-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new FormControl('', [Validators.required, Validators.minLength(3)]);
  pass = new FormControl('', [Validators.required, Validators.minLength(5)]);
  hide = true;
  progressShow = false;
  tmpUser: User;
  loginText = "Login";

  constructor(private authService: AuthenticationServiceService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.authService.check();

    if(this.authService.loggedIn())
    {
      this.router.navigate(['']);
    }
  }

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
        this.tmpUser = new User();
        this.tmpUser.username = this.user.value;
        this.tmpUser.password = this.pass.value;
        this.progressShow = true;

        this.authService.login(this.tmpUser).subscribe((data: User) => {
          if (data.id != null) {
            console.log(data);
            this.router.navigate(['']);
          }else
          {
            this.loginText = "Invalid username or password"
            this.progressShow = false;
          }
        })
      }
    }
  }
}
