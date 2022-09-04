import { Component } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter } from 'rxjs';
import { EventMessage, EventType } from '@azure/msal-browser';
import { CryptoUtils, Logger } from 'msal';
import { UsersService } from './users/users.service';
import { UserDTO } from './users/users';
import { environment } from 'src/environments/environment.prod';


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

  constructor(
    private broadcastService: MsalBroadcastService, 
    private authService: MsalService, 
    private userService: UsersService) {
      this.currentUser = {
        id: currentUserId,
        name: '',
        username: '',
        email: '',
        password: ''
      }
   }

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
      var flag = false
      if (authReponse.account) {
        this.userService.getUsers().subscribe(res => {
          res.forEach(u => {
            if (u.name == authReponse.account?.name! && u.username == authReponse.account?.username! && !flag) {
              flag = true;
              currentUserId = u.id
            }
          });
        });
        if (!flag) {
          this.currentUser = {
            id: currentUserId,
            name: authReponse.account?.name!,
            username: authReponse.account?.username!,
            email: authReponse.account?.username!,
            password: ''
          }
          this.userService.createUser(this.currentUser).subscribe(res => {
            currentUserId = res.id
          })
        }
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

export var currentUserId: number = -1;