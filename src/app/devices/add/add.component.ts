import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../devices';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  form!: FormGroup;
  isNumber!: boolean;
  id: number;

  constructor(
    public deviceService: DevicesService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.isNumber = false; 
    let url = this.route.snapshot.url.join('/');
    let urlParams = url.split('/');
    this.id = +urlParams[2];
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      userId: new FormControl(`${this.id}`, Validators.required),
    });
  }

  get f() { return this.form.controls; }
    
  submit(){
    console.log(this.form.value);
    // console.log(this.form.valid);
    console.log(this.form.get('phoneNumber')!.value)
    this.deviceService.getDevices().subscribe((res: Device[]) => {
      var flag = true;
      res.forEach(device => {
        if (this.form != null && this.form.get('phoneNumber')!.value === device.phoneNumber) {
          console.log(device.phoneNumber)
          flag = false;
        }
      })
      if (flag) {
        this.deviceService.addDevice(this.form.value).subscribe((res: Device) => {
          console.log("Device created successfully!");  
          this.router.navigateByUrl(`users/${res.userId}`);
        });
        this.isNumber = true;
      }
      else {
        alert("Please pick a unique phone number")
      }
    })
  }
  
}