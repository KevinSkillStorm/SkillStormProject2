import { Component, EventEmitter, Output } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { EventMessage, EventType } from '@azure/msal-browser';
import { CryptoUtils, Logger } from 'msal';
import { UsersService } from './users/users.service';
import { UserDTO } from './users/users';
import { AppService } from './app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'telecom-frontend';
  isIframe = false;
  loggedIn = false;

  currentUser: UserDTO;
  currentUserId: number = -1;

  constructor(
    private sendEvent: AppService,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
    private userService: UsersService,
    private router: Router) {
    this.currentUser = {
      id: this.currentUserId,
      name: '',
      username: '',
      email: '',
      password: ''
    }
  }



  ngOnInit(): void {
    this.currentUserId = this.sendEvent.getCurrentUserId();
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
    this.authService.handleRedirectObservable().subscribe(
      (authReponse) => {
        // console.log(authReponse);
        console.log(authReponse.account?.username)
        console.log(authReponse.account?.name)
        var flag = false
        if (authReponse.account) {
          this.userService.getUsers().subscribe(res => {
            res.forEach(u => {
              if (u.name == authReponse.account?.name! && u.username == authReponse.account?.username! && !flag) {
                flag = true;
                this.currentUserId = u.id;
                this.sendEvent.sendCurrentUserId(this.currentUserId);
              }
            });
          });
          if (!flag) {
            this.currentUser = {
              id: this.currentUserId,
              name: authReponse.account?.name!,
              username: authReponse.account?.username!,
              email: authReponse.account?.username!,
              password: ''
            }
            this.userService.createUser(this.currentUser).subscribe(res => {
              this.currentUserId = res.id;
              this.sendEvent.sendCurrentUserId(this.currentUserId);
            })
          }
          this.router.navigateByUrl(`users/${this.currentUserId}`);
        }
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