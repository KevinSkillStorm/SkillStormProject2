import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { RemoveComponent } from './remove/remove.component';


@NgModule({
  declarations: [
    ViewComponent,
    AddComponent,
    RemoveComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule
  ]
})
export class PlansModule { }
