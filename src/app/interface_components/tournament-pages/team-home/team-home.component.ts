import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
}
