import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { WindowUtils } from 'msal';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  images = ["rose", "resort", "dog"].map((n) => `assets/picture/${n}.jpg`);

  loggedIn! : Boolean;

  showCondition: Boolean = false;

  currentUserId!: number;

  constructor(
    private authService: MsalService,
    private app: AppComponent,
    private router: Router,
    private sendEvent: AppService
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.currentUserId = this.app.currentUserId;
      console.log(`this.currentUserId = ${this.currentUserId}`);
      this.showCondition = true;
    }, 1000);
    this.app.checkAccount();
    this.loggedIn = this.app.loggedIn;
    console.log(`this.loggedIn = ${this.loggedIn}`);
    console.log(`this.app.loggedIn = ${this.app.loggedIn}`);    
  }
  ngOnChanges(): void {
    this.app.checkAccount();
    this.loggedIn = this.app.loggedIn
    this.currentUserId = this.sendEvent.getCurrentUserId();
    console.log(`this.currentUserId = ${this.currentUserId} changed`);
  }
  public isLoggedIn(): Boolean {
    return this.authService.instance.getActiveAccount() != null;
    
  }
}


