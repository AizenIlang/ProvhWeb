import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Users } from '../Users.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardHospital implements CanActivate {



  constructor(private router : Router) { }

  canActivate(){
     
     user : Users;
     let user = JSON.parse(localStorage.getItem('user'));
    
    
      if(user.hospitalMember){
       return true;
      //  this.router.navigate(['/login']);
       
     }
     return false;

  }
}
