import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  listAppoint;
  constructor(private db : AngularFireDatabase) {


   }

   getAppointments(key : String){
      this.listAppoint = this.db.list('/Appointments/'+key).valueChanges().subscribe(data =>{
        this.listAppoint = data;
        return this.listAppoint;
      });
   }

   
}

export class Appointments{

  date: String;

hospitalName: String;

message: String;

status: String;

type: String;

uid: String;

constructor (dt : String, hp : String, ms : String, st : String, tp : String, u : String ){

  this.date = dt;
  this.hospitalName = hp;
  this.message =ms;
  this.status = st;
  this.type = tp;
  this.uid = u;

}

}
