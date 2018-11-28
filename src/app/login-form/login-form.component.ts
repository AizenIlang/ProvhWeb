import { Component, ViewEncapsulation , HostBinding} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from './username.validators';
import { AngularFireStorageModule} from 'angularfire2/storage';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { SignupComponent} from '../signup/signup.component';
import { UserService } from '../user.service';



@Component({
  selector: 'app-login-form',
  
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class LoginFormComponent {
    invalidLogin : boolean;
    Users$;
    Users;

    //VariaUser
    UN : String;
    PW : String;
    
    constructor(db : AngularFireDatabase, private afAuth : AngularFireAuth, private route : Router,
      public dialog: MatDialog, private userService : UserService){
      this.invalidLogin = true;
      this.Users$ = db.list('/Users');
      db.list('/Users').valueChanges().subscribe(Users => {
        this.Users = Users;
        
      })

      
      
    }

    form = new FormGroup({
        UserName : new FormControl('',[
          Validators.required,
          Validators.minLength(3),
          UsernameValidators.cannotContainSpace],
          UsernameValidators.shouldBeUnique
        ),
        Password : new FormControl('',Validators.required)

    });

    get UserName(){
       return this.form.get('UserName');
    }
    
    get Password(){
      return this.form.get('Password');
    }

    login(){
      
      // this.form.setErrors({
      //   invalidLogin:true
      // });
      
      console.log("checking");
      for(let magic of this.Users){
        
        if(this.form.get('UserName').value === magic.userName){
           
           this.UN = this.form.get('UserName').value;
           this.PW = magic.password;
           if(this.PW == this.form.get('Password').value){
              console.log(this.afAuth.auth.signInWithEmailAndPassword(magic.email,magic.password));
              localStorage.setItem('user', JSON.stringify({
                actived : magic.actived,
                admin : magic.admin,
                email : magic.email,
                hospitalMember : magic.hospitalMember,
                hospitalKey : magic.hospitalKey,
              firstName : magic.firstName,
              middleName : magic.middleName,
              lastName : magic.lastName,
              bloodType : magic.bloodType,
              date : magic.date,
              password : magic.password,
              userName : magic.userName              
              }));
              
             if(magic.admin){
              this.route.navigate(['admin']);
              console.log("is admin");
             }
             
             console.log("check if hospial membr" + magic.hospitalMember)
             if(magic.hospitalMember){
               this.route.navigate(['hospitalmember']);
               
             }
             console.log("is not admin");
            return;
           }
           
        }
      }
      
      this.form.setErrors({
        invalidLogin: true
      });

    }

    onCreate(){
    
      this.dialog.open(SignupComponent);
    }

    
}
