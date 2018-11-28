import { Injectable } from '@angular/core';
import {AngularFireDatabase} from'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private db : AngularFireDatabase) { }
  
  

  getListHospitals(){
    return this.db.list('Hospitals');
  }

  setHospital(hospital: any){
    let key = this.db.createPushId();
    
    this.db.object('/Hospitals/'+key).set(hospital);
    
  }
  
  getHospital(key : string){
    this.db.object('/Hospitals/'+key).valueChanges().subscribe(data =>{
      return data;
    });
  }

  getListHospitalsArray(){
    this.db.list('Hospitals').valueChanges().subscribe(data =>{
      let list : Array<any>;
      list = [data];
      // for(let x of data){
        
      // }
      return list;
    });
    
  }

}



class Hospital {

  constructor(){}
  HospitalID : number;
  Name : String;
  Location : String;
  Address : String;
  ContactNumber : String;
  Email : String;
  Coordinates : String;
  Details : String;
  Services : String;
  Rating : number;
  image : String;
  Key : String;

}
