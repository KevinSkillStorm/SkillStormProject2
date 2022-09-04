import { Component, OnInit } from '@angular/core';
import { interceptconfig } from 'src/app/app-config';
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  images = ["rose", "resort", "dog"].map((n) => `assets/picture/${n}.jpg`);
  currentUserId: number;

  constructor() { 
    this.currentUserId = environment.currentUserId
  }

  ngOnInit(): void {
  }

  

}


