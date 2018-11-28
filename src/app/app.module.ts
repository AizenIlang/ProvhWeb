import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule } from '@angular/material/table';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import {MatNativeDateModule, MatSliderModule, DateAdapter} from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HospitalComponent } from './hospital/hospital.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DropZoneDirective } from './drop-zone.directive';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminComponent } from './admin/admin.component';
import { EdituserComponent } from './edituser/edituser.component';
import { CommentsComponent } from './comments/comments.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { AddhospitaldialogComponent } from './addhospitaldialog/addhospitaldialog.component';
import { UserService } from './user.service';
import { HospitalService } from './hospital.service';
import { SignupComponent } from './signup/signup.component';
import { HospitalmemberComponent } from './hospitalmember/hospitalmember.component';

import{ AuthguardService} from './service/authguard.service';
import { AuthGuardHospital } from './service/authhospital.service';



@NgModule({
  declarations: [
    AppComponent,
    HospitalComponent,
    FileUploadComponent,
    DropZoneDirective,
    LobbyComponent,
    LoginFormComponent,
    AdminComponent,
    EdituserComponent,
    CommentsComponent,
    CreateuserComponent,
    AddhospitaldialogComponent,
    SignupComponent,
    HospitalmemberComponent,
    
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      
      {path : 'login' , component : LoginFormComponent},
      {path : '', component : LoginFormComponent},
      {path : 'edituser/:uid' , component : EdituserComponent},
      {path : 'admin' ,
          component : HospitalComponent,
          canActivate: [AuthguardService]
          },
      {path : 'createuser' , component : CreateuserComponent,
          canActivate: [AuthGuardHospital]
        },
      {path : 'hospitalmember' , component : HospitalmemberComponent, 
    canActivate: [AuthGuardHospital]},
    ])
    
    
  ],
  providers: [
   UserService,
   HospitalService,
   AuthguardService

  ],
  bootstrap: [AppComponent],
  entryComponents:[AddhospitaldialogComponent,SignupComponent]
})
export class AppModule { }
