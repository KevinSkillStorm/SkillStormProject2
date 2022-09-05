import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  currentUserId!: number;
  constructor(
    private sendEvent: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sendEvent.currentEvent.subscribe(id => {
      this.currentUserId = id;
      console.log(`this.currentUserId = ${this.currentUserId}`);
    }); 
  }
  
  routeToNextPage(id: number){  
    this.router.navigateByUrl(`/users/${id}`);   
  } 
}
