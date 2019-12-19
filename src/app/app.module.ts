import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './interface_components/home/home.component';
import { NavbarComponent } from './interface_components/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { SiteRoutingModule } from './site-routing/site-routing.module';
import { RegisterComponent } from './interface_components/register/register.component';
import { LoginComponent } from './interface_components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './interface_components/account/account.component';
import { DialogBoxComponent } from './interface_components/account/dialog-box/dialog-box.component';
import { TournamentHomeComponent } from './interface_components/tournament-pages/tournament-home/tournament-home.component';
import { CreateTournamentComponent } from './interface_components/tournament-pages/tournament-home/create-tournament/create-tournament.component';
import { TeamHomeComponent } from './interface_components/tournament-pages/team-home/team-home.component';
import { CreateTeamComponent } from './interface_components/tournament-pages/team-home/create-team/create-team.component';
import { YourTeamsComponent } from './interface_components/tournament-pages/team-home/your-teams/your-teams.component';
import { SearchTeamsComponent } from './interface_components/tournament-pages/team-home/search-teams/search-teams.component';
import { EditTeamDialogComponent } from './interface_components/tournament-pages/team-home/your-teams/edit-team-dialog/edit-team-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    AccountComponent,
    DialogBoxComponent,
    TournamentHomeComponent,
    CreateTournamentComponent,
    TeamHomeComponent,
    CreateTeamComponent,
    YourTeamsComponent,
    SearchTeamsComponent,
    EditTeamDialogComponent
  ],
  entryComponents: [
    DialogBoxComponent,
    EditTeamDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    SiteRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
