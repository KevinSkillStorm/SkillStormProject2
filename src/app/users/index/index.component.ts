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

  loggedIn: Boolean = this.app.loggedIn;

  // @Input() currentUserId!: number;

  currentUserId!: number;



  constructor(
    private authService: MsalService,
    private app: AppComponent,
    private router: Router,
    private sendEvent: AppService
  ) { }

  ngOnInit(): void {
    // this.authService.handleRedirectObservable().subscribe(authReponse => {
    //   authReponse.id
    // }

    // );
    this.sendEvent.currentEvent.subscribe(id => {
      this.currentUserId = id;
      console.log(`this.currentUserId = ${this.currentUserId}`);
    });    
  }
  ngOnChanges(): void {
    console.log(`this.currentUserId = ${this.currentUserId} changed`);
  }

  routeToNextPage(id: number) {
    // check if we are logged in, if not, we can't go
    if (this.app.loggedIn){
      console.log(`this.app.loggedIn = ${this.app.loggedIn}`);
      this.router.navigateByUrl(`/users/${id}`);
    } else {
      console.log('we are not logged in');
    }
   
  }
}


