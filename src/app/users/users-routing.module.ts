import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { MaslGuard } from '../masl.guard';

const routes: Routes = [
  { path: 'users', redirectTo: 'users/index', pathMatch: 'full' },
  { path: 'users/index', component: IndexComponent},
  { path: 'users/:id', component: ViewComponent, canActivate: [MaslGuard]}, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
