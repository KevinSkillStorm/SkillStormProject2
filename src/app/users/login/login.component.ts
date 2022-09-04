import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm! : FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      id: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
  }

  get f() { return this.loginForm.controls; }

  login(){
    
  }

}
