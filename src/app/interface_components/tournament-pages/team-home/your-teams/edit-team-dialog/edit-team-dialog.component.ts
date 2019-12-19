import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team } from 'src/app/model/team.model';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { TeamHomeComponent } from '../../team-home.component';
import { ManageTeamService } from 'src/app/service/manageTeam.service';

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.css']
})
export class EditTeamDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Team,
    private authService: AuthenticationService,
    private teamComponent: TeamHomeComponent,
    private teamService: ManageTeamService) { }


  teamDescription = new FormControl('', [Validators.required, Validators.minLength(3)]);

  deletePlayerFromTeam(team, player) {
    if(player != this.authService.currentUser.getValue().id)
    {
      this.data.userList.filter(item => item !== player);
    } else {
      this.teamComponent.writeASnack("Can't Delete Yourself From Your Own Team!")
    }
  }

}
