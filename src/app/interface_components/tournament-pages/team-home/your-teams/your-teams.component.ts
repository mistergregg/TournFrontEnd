import { Component, OnInit } from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { ManageTeamService } from 'src/app/service/manageTeam.service';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'app-your-teams',
  templateUrl: './your-teams.component.html',
  styleUrls: ['./your-teams.component.css']
})
export class YourTeamsComponent implements OnInit {

  private teamSubscript: Subscription;
  private teamPageSub: Subscription;

  private teams = new Array<Team>();
  private teamPages = new Array();
  public currentPage = 1;

  constructor(private teamService: ManageTeamService) { }

  ngOnInit() {
    this.teamSubscript = this.teamService.teams.subscribe(teams => {
      this.teams = teams;
    });

    this.teamPageSub = this.teamService.amountPages.subscribe(pages =>
    {
      this.teamPages = new Array();

      for (let i = 1; i <= pages; i++)
      {
        this.teamPages.push(i);
      }
    });

    this.pageClick(1);
    this.teamService.getAmountPages().subscribe();
  }

  pageClick(num)
  {
    this.currentPage = num;
    let retrievePages: Observable<number>;
    retrievePages = this.teamService.getAmountPages();

    return this.teamService.retrieveTeams(num).subscribe();
  }
}
