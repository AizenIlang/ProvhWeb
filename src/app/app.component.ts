import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Users } from './Users.component';
import { UserService } from './user.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent {
  title = 'ProvHFirebase';
  Users$;
  Users;
  myUser : Users;
  //For Adding
  

  constructor(db : AngularFireDatabase, public user : UserService){
      this.Users$ = db.list('/Users');
      db.list('/Users').valueChanges().subscribe(Users => {
        this.Users = Users;
      });
      



      console.log(this.Users$);
  }

  add(users : HTMLInputElement){
    console.log(users);
    // this.myUser = new Users("MyFirst","Last","dugo","first Date");
    
    // this.Users$.push(this.myUser);
  }
}
