import { Component } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter } from 'rxjs';
import { EventMessage, EventType } from '@azure/msal-browser';
import { CryptoUtils, Logger } from 'msal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'telecom-frontend';
  isIframe = false;
  loggedIn = false;

  constructor(private broadcastService: MsalBroadcastService, private authService: MsalService) { }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();

    this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });

    this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });

    // 
    this.authService.handleRedirectObservable().subscribe((authReponse) => {
      // console.log(authReponse);
      console.log(authReponse.account?.username)
      console.log(authReponse.account?.name)
    });

  }
  public checkAccount() {
    this.loggedIn = !!this.authService.instance.getActiveAccount();
  }

  public login() {
    this.authService.loginRedirect();
  }
  public logout() {
    this.authService.logout();
  }

}
