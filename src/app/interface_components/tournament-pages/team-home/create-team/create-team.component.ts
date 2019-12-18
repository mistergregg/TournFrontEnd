import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ManageTeamService } from 'src/app/service/manageTeam.service';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/team.model';
import { Router } from '@angular/router';
import { TeamHomeComponent } from '../team-home.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent {

  constructor(private teamService: ManageTeamService, private teamComponent: TeamHomeComponent) { }

  teamName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  teamDescription = new FormControl('', [Validators.required, Validators.minLength(3)]);

  anyErrors = "";

  getTeamNameError() {
    return this.teamName.hasError('minlength') ? 'Team Name length not Long Enough' : '';
  }

  getDescriptionError() {
    return this.teamDescription.hasError('minlength') ? 'Team Description not Long Enough' : '';
  }

  buttonCreateTeam() {
    if(!this.teamName.hasError('minlength') && this.teamName.value !== "")
    {
      const name = this.teamName.value;
      const description = this.teamDescription.value;

      if(!this.teamDescription.hasError('minlength') && this.teamDescription.value !== "")
      {
        this.teamComponent.progressShow = true;

        let createTeam: Observable<Team>;
        createTeam = this.teamService.createTeam(name, description);

        createTeam.subscribe(resData => {
          if (resData.name != null)
          {
            this.teamComponent.showCreateTeam = false;
            this.teamComponent.showYourTeams = true;
            this.teamComponent.progressShow = false;

            this.teamService.getAmountPages().subscribe();
            this.teamComponent.writeASnack(resData.name + " created!")
          }
        }, error => {
          console.log(error);
          this.anyErrors = "Could not connect to server";
          this.teamComponent.progressShow = false;
        });
      }
    }
  }
}
