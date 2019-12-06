import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from '../interface_components/home/home.component';
import { RegisterComponent } from '../interface_components/register/register.component';
import { LoginComponent } from '../interface_components/login/login.component';
import { AuthenticationSignUpGuard } from './authenticationSignUp.guard';
import { AccountComponent } from '../interface_components/account/account.component';
import { AuthenticationGuard } from './authentication.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthenticationSignUpGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticationSignUpGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
