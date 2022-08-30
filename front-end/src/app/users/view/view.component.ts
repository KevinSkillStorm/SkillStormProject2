import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plans } from 'src/app/plans/plans';
import { PlansService } from 'src/app/plans/plans.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  userId: number = -1;

  plans!: Plans;

  constructor(
    private plansService: PlansService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.retrievePlan(this.userId);
  }

  retrievePlan(id: number) {
    this.plansService.getPlan(id).subscribe(gotPlans => this.plans = gotPlans)
  }



}
