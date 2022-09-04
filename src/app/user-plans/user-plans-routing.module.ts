import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../users/index/index.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: 'user-plans/add/:id1/:id2', component: AddComponent },
  { path: 'user/index', component: IndexComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPlansRoutingModule { }
