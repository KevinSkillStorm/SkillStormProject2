import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Device } from 'src/app/devices/devices';
import { DevicesService } from 'src/app/devices/devices.service';
import { Plan } from 'src/app/plans/plans';
import { PlansService } from 'src/app/plans/plans.service';
import { UserPlansService } from 'src/app/user-plans/user-plans.service';
import { User } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number;
  plans: Plan[] = [];
  devices: Device[] = [];
  // user!: Observable<User>;
  user: User;
  selectedPlanId!: number;

  constructor(
    private planService: PlansService,
    private userPlansService: UserPlansService,
    private plansService: PlansService,
    private deviceService: DevicesService,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { 
    let url = this.route.snapshot.url.join('/');
    let urlParams = url.split('/');
    this.id = +urlParams[1];
    // console.log(this.id)
    this.user = {
      id: this.id,
      name: '',
      username: '',
      email: '',
      password: '',
      phoneNumbers: [],
      userPlans: [],
      devices: []
    }
    // setTimeout(() => {
    //   this.retrieveUser();
    // }, 200000);
    // console.log(this.user)
  }

  ngOnInit() {
    // this.userId = this.route.snapshot.params['id'];
    this.retrieveUser();
    this.retrievePlans();
    this.retrieveDevices();
    // this.cd.detectChanges();
  }

  retrievePlans() {
    this.userPlansService.getUserPlans().subscribe(gotUserPlans => gotUserPlans.forEach(userPlan => {
      if (userPlan.userId == this.id) {
        this.plansService.getPlan(userPlan.planId).subscribe(plan => {
          this.plans.push(plan)
          // console.log(plan)
        })
      }
    }))
    // console.log(this.plans)
  }

  retrieveDevices() {
    this.deviceService.getDevices().subscribe(gotDevices => gotDevices.forEach(device => {
      if (device.userId == this.id) {
        this.devices.push(device);
      }
    }))
  }

  retrieveUser() {
    // this.user = this.userService.getUser(this.id);
    this.userService.getUser(this.id).subscribe(u => {
      this.user = u;
      this.cd.detectChanges();
      // console.log(this.user);
    });
  }

  removeUser(id : number): void {
    if(confirm("Are you sure to delete this user?")) {
      console.log(`ID of the user to be removed: ${id}`)  
      this.userService.deleteUser(id).subscribe({
        next: () => {
          console.log(`The user with ID = ${id} have been removed.`)
          this.router.navigateByUrl('/users');
        },
        error: () => {
          console.log(`An error occurred when trying to remove the user with ID = ${id}.`)
        }
      })
    }
  }

  removePlan(id: number): void {
    if(confirm("Are you sure to delete this plan?")) {
      console.log(`ID of the plan to be removed: ${id}`)  
      this.userPlansService.getUserPlans().subscribe(gotUserPlans => gotUserPlans.forEach(userPlan => {
        if (userPlan.userId == this.id && userPlan.planId == id) {
          this.userPlansService.deleteUserPlan(userPlan.id).subscribe({
            next: () => {
              this.plans = this.plans.filter(u => u.id != id)
              console.log(`The plan with ID = ${id} have been removed.`)
            },
            error: () => {
              console.log(`An error occurred when trying to remove the plan with ID = ${id}.`)
            }
          })
        }
      }))
    }
  }
  
  removeDevice(id: number): void {
    if(confirm("Are you sure to delete this device?")) {
      console.log(`ID of the device to be removed: ${id}`)  
      this.deviceService.deleteDevice(id).subscribe({
        next: () => {
          this.devices = this.devices.filter(u => u.id != id)
          console.log(`The device with ID = ${id} have been removed.`)
        },
        error: () => {
          console.log(`An error occurred when trying to remove the device with ID = ${id}.`)
        }
      })
    }
  }
  routeToUpdate(device: Device, userId : number){
    this.retrievePlanName(device, userId);
  }
  retrievePlanName(device: Device, userId : number){
    this.planService.getPlans().subscribe(gotPlans => {
      gotPlans.forEach(plan => {
        if (plan.name == device.name) {
          this.selectedPlanId = plan.id;
          this.router.navigateByUrl(`devices/edit/${userId}/${this.selectedPlanId}/${device.id}`);
        }
      })
    });
  }
  calculatePrice(): string {
    var total = 0
    this.plans.forEach(p => total += p.price)
    return `${total}` 
  }
}
