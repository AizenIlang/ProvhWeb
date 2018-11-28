import { Component, OnInit,Inject } from '@angular/core';
import { HospitalService} from '../hospital.service';
import { tap, finalize } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addhospitaldialog',
  templateUrl: './addhospitaldialog.component.html',
  styleUrls: ['./addhospitaldialog.component.css']
})
export class AddhospitaldialogComponent implements OnInit {

  task : AngularFireUploadTask;

  percentage : Observable<number>;

  snapshot : Observable<any>;

  downloadURL : Observable<string>;

  isHovering : boolean;

  HospitalID : number;
  Name : String;
  Location : String;
  Address : String;
  ContactNumber : String;
  Services : String;
  Email : String;
  Coordinates : String;
  Details : String;
  Rating : number;
  image : string;

  constructor(private hospitalService : HospitalService,private db : AngularFireDatabase, private storage : AngularFireStorage,) { }

  ngOnInit() {
  }

  

  checkUpload(event : FileList){
    const file = event.item(0);
    
    if(file.type.split('/')[0] !== 'image'){
      console.error('unsupported file format');
      return;
    }

  
    
    const path = `hospital/${new Date().getTime()}_${file.name}`;
    
    const customMetadata = { app : 'PROV-H meta'};

    const ref = this.storage.ref(path);
    
    this.task = ref.put(file,{customMetadata});

      
    
    // this.downloadURL = ref.getDownloadURL();
    // this.percentage = this.task.percentageChanges().pipe(
    //   finalize(()=>{
    //     console.log("call me maybe");
    //   })
    // );
    
       this.task.snapshotChanges().pipe(
         finalize(()=>{
          
         this.createandPushHospital(path)

         })
       ).subscribe();
   
    
        
 
   
    
   

  }
  
  createandPushHospital(path : string ){
    const tempHospital = new Hospital;    
    tempHospital.HospitalID = this.HospitalID;
    tempHospital.Address = this.Address;
    tempHospital.ContactNumber = this.ContactNumber;
    tempHospital.Coordinates = this.Coordinates;
    tempHospital.Details = this.Details;
    tempHospital.Services = this.Services;
    tempHospital.Email = this.Email;
    tempHospital.image = path;
    tempHospital.Location = this.Location;
    tempHospital.Name = this.Name;
    tempHospital.Rating = this.Rating;
    
    const theID = this.db.createPushId();
    tempHospital.Key = theID
    // this.db.object('/Hospitals/'+theID).set(tempHospital);
    
    this.hospitalService.setHospital(tempHospital);
    
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