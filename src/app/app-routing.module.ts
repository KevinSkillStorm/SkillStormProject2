import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './users/index/index.component';
import { LoginComponent } from './users/login/login.component';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full' },
  {path: 'users', component: IndexComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
