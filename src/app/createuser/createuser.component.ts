import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Users } from '../Users.component';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

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
  

  constructor(private db : AngularFireDatabase, private auth : AngularFireAuth) { 
    
  }

  ngOnInit() {

  }
   
  add(){
 
     let user : Users = new Users(true,false,this.email,false,"",this.firstName,this.middleName,this.lastName,"",this.date,this.password,this.userName,"");


    this.auth.auth.createUserWithEmailAndPassword(this.email,this.password.toString())
    .then(reason =>{
      alert("User Created");
    }, prom =>{

    });

    const theID = this.db.createPushId();
    user.userKey = theID;
    this.db.object('/Users/'+theID).set(user);
    
     
  }

  delete(){

  }

}
