import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './users/index/index.component';
import { BackendGuard } from './backend.guard';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full' },
  {path: 'users', component: IndexComponent, canActivate: [BackendGuard]},
  // {path: '/api/users', component: IndexComponent, canActivate: [BackendGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
