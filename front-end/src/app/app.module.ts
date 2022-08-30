import { NgForOf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { DevicesModule } from './devices/devices.module';
import { PhoneNumbersModule } from './phone-numbers/phone-numbers.module';
import { UserPlansModule } from './user-plans/user-plans.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgForOf,
    
    UsersModule,
    PlansModule,
    DevicesModule,
    PhoneNumbersModule,
    UserPlansModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
