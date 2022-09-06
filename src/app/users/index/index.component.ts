import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  images = ["rose", "resort", "dog"].map((n) => `assets/picture/${n}.jpg`);

  loggedIn: Boolean = false;


  // @Input() currentUserId!: number;

  currentUserId!: number;



  constructor(
    private authService: MsalService,
    private app: AppComponent,
    private router: Router,
    private sendEvent: AppService
  ) { }

  ngOnInit(): void {
    this.app.checkAccount();
    this.loggedIn = this.app.loggedIn;

    console.log(`this.loggedIn = ${this.loggedIn}`);
    this.currentUserId = this.sendEvent.getCurrentUserId();
    console.log(`this.currentUserId = ${this.currentUserId}`);
  }
  ngOnChanges(): void {
    this.app.checkAccount();
    this.loggedIn = this.app.loggedIn;
    console.log(`this.currentUserId = ${this.currentUserId} changed`);
  }

  isLoggedIn():Boolean{
    return this.app.isLoggedin();
  }
 
}


