import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserDTO } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  isNumber!: boolean;

  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  get f() { return this.form.controls; }
    
  submit(){
    console.log(this.form.value);
    console.log(this.form.valid);
    this.userService.createUser(this.form.value).subscribe((res: UserDTO) => {
      console.log("User created successfully!");
      this.router.navigateByUrl(`users/${res.id}`);
    });
  }
}
