import { Injectable, OnInit } from '@angular/core';
import { Team } from '../model/team.model';
import { HttpClient } from '@angular/common/http';
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
  }

  public createTeam(name: string, description: string) {
    let tmp = new Team();
    tmp.name = name;
    tmp.description = description;
    tmp.userToken = {username: this.authService.currentUser.getValue().username, expiresIn: "0", token: this.authService.currentUser.getValue().token}

    return this.http.post<Team>('http://localhost:8080/tournaments/addTeam', tmp).pipe(tap(resData => {
      console.log(resData);
      if(resData.name != "")
      {
        let theTeams: Team[] = [];

        if (this.teams.getValue() == null)
        {
          theTeams.push(resData);
        } else {
          theTeams = this.teams.getValue();
          theTeams.push(resData);
        }

        this.teams.next(theTeams);
      }
    }));
  }

  public retrieveTeams(page: string) {
    let tmp = new UserToken();
    tmp.username = this.authService.currentUser.getValue().username;
    tmp.expiresIn = page;
    tmp.token = this.authService.currentUser.getValue().token;

    return this.http.post<Team[]>("http://localhost:8080/tournaments/getTeams", tmp).pipe(tap(resData2 => {
      if(resData2.length > 0)
      {
        this.teams.next(resData2);
      }
    }));
  }

  getAmountPages() {
    let tmp = new UserToken(this.authService.currentUser.getValue().username, "0", this.authService.currentUser.getValue().token);

    return this.http.post<number>("http://localhost:8080/tournaments/getAmountTeams", tmp).pipe(tap(resData => {

      this.amountPages.next(Math.floor(resData / 10) + 1);
    }));
  }

  deleteUserFromTeam(team, user) {

    const tmp = {teamid: team, userId: user};

    return this.http.post<number>("http://localhost:8080/tournaments/getAmountTeams", tmp).pipe(tap(resData => {

      this.amountPages.next(Math.floor(resData / 10) + 1);
    }));
  }
}
