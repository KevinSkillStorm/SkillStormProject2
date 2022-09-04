import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  images = ["rose", "resort", "dog"].map((n) => `assets/picture/${n}.jpg`);

  @Input() currentUserId!: number;

  constructor() { }

  ngOnInit(): void {
  }

  

}


