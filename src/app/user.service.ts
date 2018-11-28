import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { map, switchMap } from 'rxjs/operators';

import { Users } from './Users.component';
import swal from 'sweetalert'

@Injectable({
  providedIn: 'root'
})
export class UserService {

 



  User;
  isAdmin = false;
  uid = this.afAuth.authState.pipe(
    map(authState =>{
        if(!authState){
          return null;
        }else{
           this.User =  JSON.parse(localStorage.getItem('user'));
           this.isAdmin = this.User.admin;
          return authState.uid;
        }

    })
    
    
    )
  


  constructor(private afAuth: AngularFireAuth, private db : AngularFireDatabase) { }

  login() {
   
    

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  
  add(act: boolean, adm : boolean, ema : String, hospitalMember : boolean, hospitalKey : String, fn : String, mn : String, ln : String, bt : String, dt : String, pw : String, un : String, uk : String){
 
    let user : Users = new Users(act,
      adm,ema,hospitalMember,
      "",
      fn,
      mn,
      ln,
      "",
      dt,
      pw,
      un,
      uk);


   this.afAuth.auth.createUserWithEmailAndPassword(user.email.toString(),user.password.toString())
   .then(reason =>{
    const theID = this.db.createPushId();
    user.userKey = theID;
    this.db.object('/Users/'+theID).set(user);
    swal("Good job!", "User " + user.userName + " Created", "success");
     
   }, prom =>{

   });

   
   
    
 }

}


