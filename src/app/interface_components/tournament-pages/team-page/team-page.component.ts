import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Team } from 'src/app/model/team.model';
import { YourTeamsComponent } from '../team-home/your-teams/your-teams.component';
import { BehaviorSubject } from 'rxjs';
import { ManageTeamService } from 'src/app/service/manageTeam.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {
  public aTeam = new Team();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamC: YourTeamsComponent,
    private teamService: ManageTeamService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.teamService.getTeam(params.get('teamId'));
    })).subscribe(resData => {
      this.aTeam = resData;
    });
  }

}
