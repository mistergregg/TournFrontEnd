import { Injectable } from '@angular/core';
import { Team } from '../model/team.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageTeamService {
  teams = new BehaviorSubject<Team[]>(null);

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
  }

  public createTeam(name: string, description: string) {
    let tmp = new Team();
    tmp.name = name;
    tmp.description = description;
    tmp.userToken = this.authService.currentUser.getValue().token;

    return this.http.post<Team>('http://localhost:8080/tournaments/addTeam', tmp).pipe(tap(resData => {
      if(resData.name != "")
      {
        let teams: Team[];

        if (this.teams.getValue() == null)
        {
          teams.push(resData);
        } else {
          teams = this.teams.getValue();
          teams.push(resData);
        }

        this.teams.next(teams);
      }
    }));
  }

  retrieveTeams(page: number){}
}
