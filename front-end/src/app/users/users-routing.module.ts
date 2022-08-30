import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path : 'users', redirectTo: 'users/login', pathMatch: 'full'},
  {path : 'users/login', component: LoginComponent},
  {path : 'users/sign-up', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
