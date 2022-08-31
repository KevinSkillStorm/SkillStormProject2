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

  constructor(
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
    console.log(this.id)
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
        this.plansService.getPlan(this.id).subscribe(plan => this.plans.push(plan))
      }
    }))
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
      console.log(this.user);
    });
  }

}
