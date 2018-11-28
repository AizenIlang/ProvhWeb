import { Component ,Inject, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { Hospital } from '../hospital/hospital.component';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Users } from '../Users.component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


import { Observable } from 'rxjs';
import { AppointmentsService } from '../appointments.service';
import { database } from 'firebase';

@Component({
  selector: 'app-hospitalmember',
  templateUrl: './hospitalmember.component.html',
  styleUrls: ['./hospitalmember.component.css']
})
export class HospitalmemberComponent implements OnInit {

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  
  hospital$;
  appointments$ : AngularFireList<any>

  displayedColumns: string[] = ['date','hospitalName','message','status','picker','picker2'];
      columnsToDisplay: string[] = this.displayedColumns.slice();
      data: any;
      
  constructor(private hospitalService : HospitalService, private db : AngularFireDatabase,private app : AppointmentsService) { }

  
  

  async ngOnInit() {
    user : Users;
    
    let user = JSON.parse(localStorage.getItem('user'));
    this.hospital$ = new Hospital();    
    this.db.object('/Hospitals/'+user.hospitalKey).valueChanges().subscribe(data =>{
      this.hospital$ = data;
      console.log(this.hospital$);
    });
    
    // this.db.list('/Appointments/'+user.hospitalKey).valueChanges().subscribe(data =>{
    //   this.appointments$ = data;
      
    // });


    var appointmentList= [];

   this.appointments$ =  await this.db.list('Appointments/'+user.hospitalKey);
   await this.appointments$.snapshotChanges().subscribe(item =>{
     item.forEach(element => {
       var y = element.payload.toJSON();
       appointmentList.push(y);

     })
    //  console.log(hospitalList);
     this.data = new MatTableDataSource(appointmentList);
     this.data.sort = this.sort;
     this.data.paginator = this.paginator;
     
   });


 }
    
  }




