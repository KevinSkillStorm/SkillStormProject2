import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { UserPlan } from 'src/app/user-plans/user-plans';
import { UserPlansService } from 'src/app/user-plans/user-plans.service';
import { Plan } from '../plans';
import { PlansService } from '../plans.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public newUserPlan!: FormGroup;

  planIdValue!: number;
  userPlanDataFromUser!: UserPlan;
  userId!: number;
  currentUserPlan!: number;
  flag: Boolean = false;
  userPlanObservable!: Observable<Plan[]>;


  constructor(
    private userPlansService: UserPlansService,
    private plansService: PlansService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }


  ngOnInit(): void {
    // this.userId = this.route.snapshot.params['id'];
    this.userId = 1;

    // Gets the Gold plan's id number from the plans entity

    this.userPlansService.getUserPlans().subscribe(gotUserPlans => gotUserPlans.forEach(userPlan => {
      if (userPlan.userId == this.userId) {
        this.flag = true;
      }
    }))
  }


  retrievePlanId(name: string) {
    this.plansService.getPlans().subscribe(gotPlans => {
      gotPlans.forEach(plan => {
        if (plan.name === name) {
          this.planIdValue = plan.id;
          // console.log(`plan.name === ${name}`);
          // console.log(`this.planIdValue == ${this.planIdValue}`);
          this.connectNewUserPlan();
        }
      });
    });
  }


  retrieveGoldPlan() {
    this.retrievePlanId("Gold");
  }
  retrieveSilverPlan() {
    this.retrievePlanId("Silver");
  }
  retrieveBronzePlan() {
    this.retrievePlanId("Bronze");
  }


  // We are going to create a new plan and add the userID associated with userplan join table
  connectNewUserPlan() {
    // this.retrievePlanId("Gold");
    if (this.flag) {
      forkJoin(
        this.plansService.getPlan(this.planIdValue), // gets the proper plan by its id value
        this.userPlansService.getUserPlanFromUser(this.userId)
      )
        .subscribe((
          [
            planData, // outputs in this case gold record
            userPlanData,
          ]
        ) => {
          var i: number;
          for (i = 0; i < userPlanData.length; i++) {
            console.log(`i = ${i}`);
            console.log(userPlanData[i]);
            if (userPlanData[i].planId === this.planIdValue && userPlanData[i].userId === this.userId) {
              this.userPlanDataFromUser = userPlanData[i];
            }
          }
          if (window.confirm('Confirm plan?')) {
            // add user plan instead of plan and query the plan id and then create the userplan    
            this.newUserPlan = new FormGroup({
              userId: new FormControl(this.userId, Validators.required),
              planId: new FormControl(planData.id, Validators.required)
            });
            this.router.navigateByUrl(`user-plans/add/${this.userId}/${planData.id}`);
            // this.router.navigateByUrl(`users/${this.userId}`);
          }
          else {
            // user pressed cancel
          }
        }); 
    }
    // This is to populate or create userplan connection if we have no plans within system for
    // this particular user.
    else {
      console.log("We don't have any userplans associated, creating brand new! (New user)");

      if (window.confirm('Confirm plan?')) {
        this.newUserPlan = new FormGroup({
          userId: new FormControl(this.userId, Validators.required),
          planId: new FormControl(this.planIdValue, Validators.required),
        });

        // need to create userplan join table
        this.userPlansService.createUserPlan(this.newUserPlan.value).subscribe((userPlan: any) => { // response object
          console.log(userPlan);
          console.log(userPlan.id);
          console.log(userPlan.planId);
          this.router.navigateByUrl(`/users/${this.userId}`);
        });
      }
      else {
        // User canceled
      }
    }
  }

}
