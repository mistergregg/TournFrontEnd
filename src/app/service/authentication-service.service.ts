import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  currentUser: User;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUser = new User();
  }

  logout() {
    sessionStorage.removeItem('username');
  }

  loggedIn()
  {
    if(this.currentUser.username === undefined)
      return false;

    return true;
  }

  async signUp() {
    console.log(this.currentUser);
    const aResponse = await this.http.post('http://localhost:8080/createUser', this.currentUser)
      .subscribe((data: User) => {
        if (data.id != null) {
          console.log(data);
          this.currentUser = data;
          sessionStorage.setItem('username', JSON.stringify(this.currentUser));
          this.router.navigate(['']);
        }
      });
  }

  async check() {
    const aResponse = await this.http.get('http://localhost:8080/check')
      .subscribe((data: User) => {
        if (data.id != null) {
          this.currentUser = data;
          sessionStorage.setItem('username', JSON.stringify(this.currentUser));
          this.router.navigate(['']);
        }
      });
  }

  login(tmpUser: User)
  {
     return this.http.post('http://localhost:8080/login', tmpUser);
  }
}
