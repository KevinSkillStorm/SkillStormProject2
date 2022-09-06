import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './users/index/index.component';
import { UsersModule } from './users/users.module';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full' },
  {path: 'users', component: IndexComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
