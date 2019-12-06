import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private autheService: AuthenticationService, private http: HttpClient) {}

  requestAccountData() {
    if (this.autheService.currentUser.getValue().token)
    {
      const user = this.autheService.currentUser;

      const sendUser = {username: user.getValue().username, expiresIn: null, token: user.getValue().token}

      return this.http.post<User>('http://localhost:8080/user/getUser', sendUser);
    }
  }

  updateAccountData(account) {
    const sendData = {id: account.id, firstName: account.firstName, lastName: account.lastName, username: account.username, email: account.email, password: account.password};

    return this.http.post<User>('http://localhost:8080/user/updateUser', sendData);
  }
}
