import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPlansRoutingModule } from './user-plans-routing.module';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    UserPlansRoutingModule
  ]
})
export class UserPlansModule { }
