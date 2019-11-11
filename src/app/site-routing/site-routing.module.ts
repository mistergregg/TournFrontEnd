import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from '../interface_components/home/home.component';
import { RegisterComponent } from '../interface_components/register/register.component';
import { LoginComponent } from '../interface_components/login/login.component'

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
