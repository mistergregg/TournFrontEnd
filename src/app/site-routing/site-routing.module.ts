import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from '../interface_components/home/home.component';
import { RegisterComponent } from '../interface_components/register/register.component';
import { LoginComponent } from '../interface_components/login/login.component';
import { AuthenticationSignUpGuard } from './authenticationSignUp.guard';
import { AccountComponent } from '../interface_components/account/account.component';
import { AuthenticationGuard } from './authentication.guard';
import { TournamentHomeComponent } from '../interface_components/tournament-pages/tournament-home/tournament-home.component';
import { TeamHomeComponent } from '../interface_components/tournament-pages/team-home/team-home.component';
import { PlayerSearchComponent } from '../interface_components/tournament-pages/player-search/player-search.component';
import { TeamPageComponent } from '../interface_components/tournament-pages/team-page/team-page.component';
import { PageNotFoundComponent } from '../interface_components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthenticationSignUpGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticationSignUpGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthenticationGuard] },
  { path: 'tournament', component: TournamentHomeComponent, canActivate: [AuthenticationGuard]},
  { path: 'teams', component: TeamHomeComponent, canActivate: [AuthenticationGuard]},
  { path: 'team/:teamId', component: TeamPageComponent, canActivate: [AuthenticationGuard]},
  { path: 'search', component: PlayerSearchComponent, canActivate: [AuthenticationGuard]},
  { path: 'search/:username', component: PlayerSearchComponent, canActivate: [AuthenticationGuard]},
  { path: 'player/:username', component: PlayerSearchComponent, canActivate: [AuthenticationGuard]},


  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
