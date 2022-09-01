import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { RemoveComponent } from './remove/remove.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [  
  { path: 'plans/view', component: ViewComponent },
  { path: 'plans/add/:id1/:id2', component: AddComponent },
  { path: 'plans/remove', component: RemoveComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
