import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  images = ["rose", "resort", "dog"].map((n) => `assets/picture/${n}.jpg`);

  @Input() currentUserId!: number;

  constructor(private route: ActivatedRoute) {
    console.log(this.route.root.data)
   }

  ngOnInit(): void {
  }

  

}


