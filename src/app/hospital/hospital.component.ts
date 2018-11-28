import { Component ,Inject, OnInit, ViewChild } from '@angular/core';
import {AddhospitaldialogComponent} from '../addhospitaldialog/addhospitaldialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

import {HospitalService} from '../hospital.service';



@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent {

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  //ANGULAR UPLOAD VBLS
  task : AngularFireUploadTask;

  percentage : Observable<number>;

  snapshot : Observable<any>;

  downloadURL : Observable<string>;

  isHovering : boolean;
  
  //END OF VBLS

 

  UsersList;

  Hospital$;
  Hospital :AngularFireList<any>
  Hwoarang;

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

      checkMe;

      displayedColumns: string[] = ['Name','Address','ContactNumber','Email'];
      columnsToDisplay: string[] = this.displayedColumns.slice();
      data: any;
      

  constructor(private db : AngularFireDatabase, private storage : AngularFireStorage, private router : Router, 
    public dialog: MatDialog,
    private hosptialService : HospitalService) {
   this.checkMe = JSON.parse(localStorage.getItem('user'));

    

    console.log(!this.checkMe.admin);
    if(!this.checkMe.admin){
      console.log(!this.checkMe.admin);
      this.router.navigate(['']);
    }
      
    //FOR DB 
    this.Hospital$ = db.list('/Hospitals');
    db.list('/Users').valueChanges().subscribe(UsersLists => {
      this.UsersList = UsersLists;
      console.log(this.UsersList);
    });
    
   
    // db.list('/Hospitals').valueChanges().subscribe(hl =>{
    //   this.Hospital = hl;
    // });

    // this.data = hosptialService.getListHospitalsArray();
    

    //Dialog
 
 
       
}

async ngOnInit(){
   var hospitalList= [];

   this.Hospital =  await this.db.list('Hospitals');
   await this.Hospital.snapshotChanges().subscribe(item =>{
     item.forEach(element => {
       var y = element.payload.toJSON();
       hospitalList.push(y);

     })
     console.log(hospitalList);
     this.data = new MatTableDataSource(hospitalList);
     this.data.sort = this.sort;
     this.data.paginator = this.paginator;
     
   });

  

}

animal: string;
name: string;


onCreate(){
  this.dialog.open(AddhospitaldialogComponent);
}


  addHospital(Hosp : HTMLInputElement){
    console.log(Hosp);
    let Hospit = new Hospital();
    // this.Hospital = new Hospital();
    
    this.Hospital$.push(Hospit);
  }

  SendtoFirebase(imahe : String){
      console.log(imahe);
      
      
  }


  //FOR STORAGE



  
  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  //END METHOD FOR STORAGE


}


export class Hospital {

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


export class Comments {
    Uid: String;
    Message : String;
    Approved : boolean;
    Rate : number;
    Name : String;
  

}


