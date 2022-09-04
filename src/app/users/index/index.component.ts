import { Component, OnInit } from '@angular/core';
import { interceptconfig } from 'src/app/app-config';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  images = ["rose", "resort", "dog"].map((n) => `assets/picture/${n}.jpg`);
  
  constructor() { }

  ngOnInit(): void {
  }

  

}


