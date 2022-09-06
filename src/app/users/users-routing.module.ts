import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { idGuard } from '../idGuard';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: 'users', redirectTo: 'users/index', pathMatch: 'full' },
  { path: 'users/index', component: IndexComponent },
  { path: 'users/:id', component: ViewComponent, canActivate: [idGuard, MsalGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
