import { Component, OnInit } from '@angular/core';
import { interceptconfig } from 'src/app/app-config';
import { environment } from 'src/environments/environment.prod';
import { currentUserId } from 'src/app/Id';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  images = ["rose", "resort", "dog"].map((n) => `assets/picture/${n}.jpg`);

  currentUserId: number = currentUserId;

  constructor() { }

  ngOnInit(): void {
  }

  

}


