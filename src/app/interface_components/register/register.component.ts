import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { User } from '../../model/user.model';
import validate = WebAssembly.validate;
import { AuthenticationServiceService } from '../../service/authentication-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  tmpUser: User;

  first = new FormControl('', [Validators.required, Validators.minLength(3)]);
  last = new FormControl('', [Validators.required, Validators.minLength(3)]);
  user = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);

  hide = true;

  constructor(private authService: AuthenticationServiceService,
              private router: Router) { }

  ngOnInit() {
    this.authService.check();

    if(this.authService.loggedIn())
    {
      this.router.navigate(['']);
    }
  }

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
                this.authService.currentUser = new User(null, this.first.value, this.last.value, this.user.value, this.email.value, this.password.value);
                this.authService.signUp();
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
