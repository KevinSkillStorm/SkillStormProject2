import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewComponent } from './view/view.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: 'users', redirectTo: 'users/index', pathMatch: 'full' },
  { path: 'users/index', component: IndexComponent },
  // { path: 'users/sign-up', component: SignUpComponent },
  // { path: 'users/login', component: LoginComponent },
  { path: 'users/:id', component: ViewComponent, canActivate: [MsalGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
