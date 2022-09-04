import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  images = ["rose", "resort", "dog"].map((n) => `assets/picture/${n}.jpg`);

  // @Input() currentUserId!: number;

  currentUserId!: number;

  

  constructor(private app: AppComponent) { }

  ngOnInit(): void {
    this.app.currentEvent.subscribe(id => this.currentUserId = id);
    console.log(this.currentUserId);
  }

 
}


