import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPlansService } from '../user-plans.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private newUserPlan!: FormGroup;
  userId!: number;
  planId!: number;

  constructor(
    private userPlansService: UserPlansService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id1'];
    this.planId = this.route.snapshot.params['id2'];
    console.log(`id1 = ${this.userId}`);
    console.log(`id2 = ${this.planId}`);

    this.newUserPlan = new FormGroup({
      userId: new FormControl(this.userId, Validators.required),
      planId: new FormControl(this.planId, Validators.required),
    });

    this.createUserPlan();
  }

  createUserPlan() {
    this.userPlansService.createUserPlan(this.newUserPlan.value).subscribe((res: any) => { // response object
      console.log(res);
      // this.router.navigateByUrl('passenger/create/lastID');
      this.router.navigateByUrl('user/index');
    });
  }

}


