import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Team } from '../model/team.model';

export interface UserResponse {
  username: string;
  expiresIn: number;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser = new BehaviorSubject<User>(null);
  private tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.currentUser.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userInfo');

    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }

    this.tokenExpTimer = null;
  }

  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  autoLogin() {
    const user: {
      username: string;
      expiresIn: number;
      token: string;
      expirationDate: number;
    } = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
      return;
    }

    if (user.token) {
      if(new Date() < new Date(user.expirationDate)) {
        this.currentUser.next(user);
      }

      return;
    }
  }

  signUp(firstName: string, lastName: string, username: string, email: string, password: string) {
    let tmp = new User();
    tmp.firstName = firstName;
    tmp.lastName = lastName;
    tmp.username = username;
    tmp.email = email;
    tmp.password = password;

    return this.http.post<UserResponse>('http://localhost:8080/user/createUser', tmp).pipe(tap(resData => {
      if (resData.token) {
        this.handleAuthentication(resData.username, resData.expiresIn, resData.token);
      }
    }));
  }

  login(username: string, password: string) {
    let tmp = new User();
    tmp.username = username;
    tmp.password = password;

    return this.http.post<UserResponse>('http://localhost:8080/user/login', tmp).pipe(tap(resData => {
      if (resData.token) {
        this.handleAuthentication(resData.username, resData.expiresIn, resData.token);
      }
    }));
  }

  private handleAuthentication(username: string, expiresIn: number, token: string) {
    var expirationDate = +expiresIn + +(new Date().getTime());
    const user = {username: username, expiresIn: expiresIn, token: token, expirationDate: expirationDate}
    this.currentUser.next(user);
    this.autoLogout(expiresIn);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }
}
