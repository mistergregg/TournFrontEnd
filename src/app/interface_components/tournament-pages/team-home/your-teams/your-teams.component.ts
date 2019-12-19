import { Component, OnInit } from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { ManageTeamService } from 'src/app/service/manageTeam.service';
import { Team } from 'src/app/model/team.model';
import { MatDialog } from '@angular/material';
import { EditTeamDialogComponent } from './edit-team-dialog/edit-team-dialog.component';

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

  constructor(private teamService: ManageTeamService, public dialog: MatDialog) { }

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

  editTeam(teamId)
  {
    var aTeam = this.teams.filter(function(item) {
      return item.id === teamId;
    });

    console.log(aTeam[0]);

    const dialogRef = this.dialog.open(EditTeamDialogComponent, {
      width: '400px', data: aTeam[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
