import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { AddComponent } from './add/add.component';
import { RemoveComponent } from './remove/remove.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AddComponent,
    RemoveComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule
  ]
})
export class DevicesModule { }
