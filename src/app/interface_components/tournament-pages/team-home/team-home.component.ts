import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.component.html',
  styleUrls: ['./team-home.component.css']
})
export class TeamHomeComponent implements OnInit {

  showCreateTeam = false;
  showYourTeams = false;
  showSearchTeams = false;

  progressShow = false;

  constructor(private snackBar: MatSnackBar) { }

  toggleDisplayCreateTeam() {
    this.showYourTeams = false;
    this.showSearchTeams = false;
    this.showCreateTeam = !this.showCreateTeam;
  }

  toggleDisplayYourTeams() {
    this.showCreateTeam = false;
    this.showSearchTeams = false;
    this.showYourTeams = !this.showYourTeams;
  }

  toggleSearchTeams() {
    this.showCreateTeam = false;
    this.showYourTeams = false;
    this.showSearchTeams = !this.showSearchTeams;
  }

  ngOnInit(): void {
    this.showYourTeams = true;
  }

  writeASnack(message) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 2000,
    });
  }
}
