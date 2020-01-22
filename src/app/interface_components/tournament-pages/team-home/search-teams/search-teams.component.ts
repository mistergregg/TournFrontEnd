import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/model/team.model';
import { ManageTeamService } from 'src/app/service/manageTeam.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-teams',
  templateUrl: './search-teams.component.html',
  styleUrls: ['./search-teams.component.css']
})
export class SearchTeamsComponent {

  private callSearch: any;
  searchRes = new Array<Team>();
  searchPages = new Array();
  currentPage = 1;
  sValue = "";

  teamSearch = new FormControl('');

  enterHit: boolean;

  constructor(private teamService: ManageTeamService) {
    this.enterHit = false;
  }

  loadSearch(page) {
    this.currentPage = page;

    this.teamService.enterSearchLength(this.sValue).subscribe(resData => {
      if(resData > 0)
      {
        this.searchPages = new Array();

        if(resData === 0)
        {
          this.searchPages.push(1);
        } else {
          for (let i = 1; i <= Math.floor(resData / 10) + 1; i++)
          {
            this.searchPages.push(i);
          }
        }
      }
    });

    this.teamService.enterSearch(this.sValue, page).subscribe(resData => {

      for (let i = 0; i < resData.length; i++)
      {
        if(resData[i].userList.length === 1)
        {
          resData[i].userList = null;
        }
      }

      this.searchRes = resData;
    });
  }

  onKeyupEvent(event) {
    this.enterHit = false;

    if(event.key === 'Enter')
    {
      this.sValue = this.teamSearch.value;

      if(this.sValue !== '' && this.sValue.length > 1) {
        this.enterHit = true;

        clearTimeout(this.callSearch);
        this.loadSearch(1);
      }
    } else
    {
      this.currentPage = 1;
      const sValue = this.teamSearch.value;

      if(sValue !== '' && sValue.length > 1)
      {
        this.callSearch = setTimeout(() => {
          this.search(sValue);
        }, 500);
      } else {
        this.searchRes = new Array<Team>();
      }
    }
  }

  search(sValue) {
    this.teamService.search(sValue).subscribe(resData => {
      if(resData.length > 0)
      {
        for (let i = 0; i < resData.length; i++)
        {
          if(resData[i].userList.length === 1)
          {
            resData[i].userList = null;
          }
        }

        this.searchRes = resData;
      } else {
        this.searchRes = new Array<Team>();
      }
    });
  }

  pageClick(page) {

  }
}
