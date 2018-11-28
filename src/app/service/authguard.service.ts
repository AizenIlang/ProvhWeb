import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Users } from '../Users.component';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {



  constructor(private router : Router) { }

  canActivate(){
     
     user : Users;
     let user = JSON.parse(localStorage.getItem('user'));
    //  let user = localStorage.getItem('user');
     if(user.admin){
       return true;
     }else if(user.hospitalMember){
       
      //  this.router.navigate(['/login']);
       
     }
     return false;

  }
}
