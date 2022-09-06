import { NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { DevicesModule } from './devices/devices.module';
import { UserPlansModule } from './user-plans/user-plans.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MsalInterceptor, MsalModule, MsalService } from '@azure/msal-angular';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Configuration } from 'msal';
import { msalConfig, guardConfig, isIE, b2cPolicies, interceptconfig } from './app-config';

import { PublicClientApplication } from '@azure/msal-browser';
import { NgModule } from '@angular/core';
import { IndexComponent } from './users/index/index.component';


function MSALConfigFactory(): Configuration {
  return msalConfig;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: "25d9c810-c2a0-4f1e-8be8-e7cd7d02a31a",
        authority: "https://login.microsoftonline.com/common/",
        // authority: "http://localhost:4200/",
        // authority: b2cPolicies.authorities.signUpSignIn.authority,


        // redirectUri: "https://victorious-sea-08c9bd610.1.azurestaticapps.net/",
        // postLogoutRedirectUri: "https://victorious-sea-08c9bd610.1.azurestaticapps.net/",


        redirectUri: "http://localhost:4200/",
        postLogoutRedirectUri: "http://localhost:4200/",
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE,

      },
    }), guardConfig, interceptconfig),
    MsalModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgForOf,
    UsersModule,
    PlansModule,
    DevicesModule,
    UserPlansModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
