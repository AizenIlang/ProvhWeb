import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import { UserService } from '../user.service';
import {FormControl, Validators} from '@angular/forms';



export interface BloodType {
  name: string;
  type: string;
}
export interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  actived;
  admin;
  email;
  hospitalMember : boolean;
  hospitalKey : String;
  firstName : String;
  middleName : String;
  lastName : String;
  bloodType : String;
  date : String;
  password : String;
  userName : String;
  userKey : String;

  bloodControl = new FormControl('', [Validators.required]);
  // selectFormControl = new FormControl('', Validators.required);



  bloods: BloodType[] = [
    {name: 'O', type: 'O'},
    {name: 'A', type: 'A'},
    {name: 'AB', type: 'AB'},
    {name: 'B', type: 'B'},
  ];


  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
  
  constructor(private dialog : MatDialog, private userService : UserService) {

    
   }

  ngOnInit() {
  }

  onSignUp(){
    this.userService.add(
      false,
      false,
      this.email,
      false,
      "",
      this.firstName,
      this.middleName,
      this.lastName,
      this.bloodType,
      this.date,
      this.password,
      this.userName,
      "");


  }

}
