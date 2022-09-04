import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterConfigurationFeature } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PhoneNumber } from 'src/app/phone-numbers/phone-numbers';
import { Plan } from 'src/app/plans/plans';
import { PlansService } from 'src/app/plans/plans.service';
import { Device } from '../devices';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  devices: Device[] = [];
  currentPhoneNumber!: string;
  currentUserId!: number;
  currentPlanId!: number;
  currentDeviceId!: number;
  currentPlanName!: string;
  currentPlan!: Plan;
  swapPhoneNumberForm!: FormGroup;
  swapPhoneNumberForm2!: FormGroup;

  constructor(
    private planService: PlansService,
    private deviceService: DevicesService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    this.currentUserId = this.route.snapshot.params['id1'];
    this.currentPlanId = this.route.snapshot.params['id2'];
    this.currentDeviceId = this.route.snapshot.params['id3'];
    this.retrievePlanName();
  }

  retrieveDevice() {
    this.deviceService.getDevices().subscribe(gotDevices => {
      gotDevices.forEach(device => {
        console.log(`device.id == ${device.id}`);
        if (device.userId == this.currentUserId) {
          this.devices.push(device);
        }
      });

      this.retrieveCurrentPhoneNumber(this.currentUserId);
    });
  }
  retrievePlanName() {
    this.planService.getPlans().subscribe(gotPlans => {
      gotPlans.forEach(plan => {
        if (plan.id == this.currentPlanId) {
          this.currentPlanName = plan.name;
          this.currentPlan = plan;
        }
      })
      this.retrieveDevice();
    });
  }

  retrieveCurrentPhoneNumber(id: number) {
    this.deviceService.getDevices().subscribe(gotDevices => {
      gotDevices.forEach(device => {
        console.log(`device.id == ${device.id}`);
        if (device.userId == this.currentUserId && device.name == this.currentPlanName && device.id == this.currentDeviceId) {
          this.currentPhoneNumber = device.phoneNumber;
        }
      });
    });
  }


  swapPhoneNumber(device: Device): void {
    if (!(device.id == this.currentDeviceId)) {
    // swapPhoneNumber(eachDevice.id, eachDevice.name)    
    console.log(device.id);
    console.log(this.currentPlan.id);
    if (confirm("Update Device?")) {
      console.log(this.currentPhoneNumber)
      console.log(device.phoneNumber)
      this.swapPhoneNumberForm = new FormGroup({
        // id: new FormControl(device.id),
        name: new FormControl(device.name),
        phoneNumber: new FormControl(this.currentPhoneNumber),
        userId: new FormControl(device.userId)

      });
      this.swapPhoneNumberForm2 = new FormGroup({
        // id: new FormControl(this.currentDeviceId),
        name: new FormControl(this.currentPlan.name),
        phoneNumber: new FormControl(device.phoneNumber),
        userId: new FormControl(device.userId)

      });
        this.deviceService.deleteDevice(device.id).subscribe(res =>{
          this.deviceService.deleteDevice(this.currentDeviceId).subscribe(res =>{
            this.deviceService.addDevice(this.swapPhoneNumberForm.value).subscribe(res =>{
              this.deviceService.addDevice(this.swapPhoneNumberForm2.value).subscribe(res =>{
                this.router.navigateByUrl(`users/${device.userId}`);
              });
            });
          });
        });
      }
    }
    else {
      alert("You cannot swap the same number!")
    }
  }
  deviceIsNotCurrent(device: Device): boolean {

    return true;
  }
  // this.currentUserId = this.route.snapshot.params['id1'];
  //   this.currentPlanId = this.route.snapshot.params['id2'];
  //   this.currentDeviceId

  // this.deviceService.updateDevice(this.currentDeviceId, this.swapPhoneNumberForm2.value).subscribe((res: any) => { // response object
  //   console.log(res);
  // });

  // this.currentPhoneNumber = device.phoneNumber;

  
}
