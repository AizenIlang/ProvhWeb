
import {ActivatedRoute} from '@angular/router'
import { AngularFireDatabase} from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(private route : ActivatedRoute, private db :AngularFireDatabase) { 

    db.list('/Hospitals').valueChanges().subscribe(Hospitals => {
      this.HospitalList = Hospitals;
      console.log(this.HospitalList);
    });
  }

  admin : boolean;
  bloodType : String;
  date : String;
  firstName : String;
  middleName : String;
  hospitalMember : boolean;
  hospitalKey : String;
  lastName : String;
  
  password : String;
  userName : String;
  uid;
  tempUser;
  updatedUser;

  HospitalList;
  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.db.object('/Users/'+this.uid).valueChanges().subscribe(user =>{
        this.tempUser = user;
        this.updatedUser = user;
        this.admin = this.tempUser.admin;
        this.bloodType = this.tempUser.bloodType;
        this.date = this.tempUser.date;
        this.firstName = this.tempUser.firstName;
        this.middleName = this.tempUser.middleName;
        this.hospitalMember = this.tempUser.hospitalMember;
        this.hospitalKey = this.tempUser.hospitalKey;
        this.lastName = this.tempUser.lastName;
        this.password = this.tempUser.password;
        this.userName = this.tempUser.userName;
    });

    this.HospitalList = this.db.list('/Hospitals')
    .snapshotChanges().subscribe(theList =>{
      this.HospitalList = theList;
    });
    
    
  }

  update(){
    this.updatedUser.admin = this.admin;
    this.updatedUser.bloodType = this.bloodType;
    this.updatedUser.date = this.date;
    this.updatedUser.firstName = this.firstName;
    this.updatedUser.middleName = this.middleName;
    this.updatedUser.hospitalMember = this.hospitalMember;
    this.updatedUser.hospitalKey = this.hospitalKey;
    this.updatedUser.lastName = this.lastName;
    this.updatedUser.password = this.password;
    this.updatedUser.userName = this.userName;
    this.db.object('/Users/'+this.uid).update(this.updatedUser).then(ok =>{
        alert("Updated");
    }, recjected =>{
        alert("Check your Connection");
    });
  }

  remove(){
    
  }

}
