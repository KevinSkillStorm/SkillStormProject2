import { NgForOf } from '@angular/common';
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
import { MsalInterceptor, MsalModule, MSAL_BROADCAST_CONFIG, MsalService, MsalBroadcastConfiguration, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Configuration } from 'msal';
import { msalConfig, guardConfig, b3cPolicies, isIE, interceptconfig } from './app-config';
import { PublicClientApplication } from '@azure/msal-browser';
import { NgModule } from '@angular/core';



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
        authority: b3cPolicies.authorities.signUpSignIn.authority,
        redirectUri: "https://phoneserviceclient.pct.co",
        postLogoutRedirectUri: "https://phoneserviceclient.pct.co",
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
    PhoneNumbersModule,
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
