import { Injectable, OnInit, SimpleChanges } from '@angular/core';
import { Team } from '../model/team.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserToken } from '../model/usertoken.mode';

@Injectable({
  providedIn: 'root'
})
export class ManageTeamService {
  teams = new BehaviorSubject<Team[]>(null);
  amountPages = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe((value) => {
      if(value === null)
      {
          let theTeams: Team[] = [];
          this.teams.next(theTeams);
      }
    });
  }

  requestOptions()
  {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Token': this.authService.currentUser.getValue().token
    }

    return {
      headers: new HttpHeaders(headerDict)
    };
  }

  createTeam(name: string, description: string) {
    let tmp = new Team();
    tmp.name = name;
    tmp.description = description;
    tmp.userToken = {username: this.authService.currentUser.getValue().username, expiresIn: "0", token: this.authService.currentUser.getValue().token}

    return this.http.post<Team>('http://localhost:8080/team/add', tmp).pipe(tap(resData => {}));
  }

  retrieveTeams(page: string) {
    let tmp = new UserToken();
    tmp.username = this.authService.currentUser.getValue().username;
    tmp.expiresIn = page;
    tmp.token = this.authService.currentUser.getValue().token;

    return this.http.post<Team[]>("http://localhost:8080/team/getAll", tmp).pipe(tap(resData2 => {
      if(resData2.length > 0)
      {
        this.teams.next(resData2);
      }
    }));
  }

  getAmountPages() {
    let tmp = new UserToken(this.authService.currentUser.getValue().username, "0", this.authService.currentUser.getValue().token);

    return this.http.post<number>("http://localhost:8080/team/getAmount", tmp).pipe(tap(resData => {
      this.amountPages.next(Math.floor(resData / 10) + 1);
    }));
  }

  deleteUserFromTeam(team, user) {

    const tmp = {teamid: team, userId: user};

    return this.http.post<number>("http://localhost:8080/team/getAmount", tmp).pipe(tap(resData => {
      this.amountPages.next(Math.floor(resData / 10) + 1);
    }));
  }

  getTeam(id) {
    return this.http.get<Team>("http://localhost:8080/team/get/" + id, this.requestOptions()).pipe(tap(resData => {
      return resData;
    }));
  }

  search(name) {
    return this.http.get<Team[]>("http://localhost:8080/team/search/" + name, this.requestOptions());
  }

  enterSearch(name, page) {
    return this.http.get<Team[]>("http://localhost:8080/team/enterSearch/" + name + "/" + page, this.requestOptions());
  }

  enterSearchLength(name) {
    return this.http.get<number>("http://localhost:8080/team/sAmount/" + name, this.requestOptions());
  }

  deleteTeam(id) {
    return this.http.delete<number>("http://localhost:8080/team/deleteTeam/" + id, this.requestOptions());
  }
}
