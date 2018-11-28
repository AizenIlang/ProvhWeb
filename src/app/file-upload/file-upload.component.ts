import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent{

  task : AngularFireUploadTask;

  percentage : Observable<number>;

  snapshot : Observable<any>;

  downloadURL : Observable<string>;

  isHovering : boolean;

  

  constructor(private storage : AngularFireStorage) { }

  startUpload(event : FileList){
    const file = event.item(0);
    
    if(file.type.split('/')[0] !== 'image'){
      console.error('unsupported file format');
      return;
    }

    const path = `hospital/${new Date().getTime()}_${file.name}`;

    const customMetadata = { app : 'PROV-H meta'};

    const ref = this.storage.ref(path);
    this.task = ref.put(file,{customMetadata});

    
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    
    this.downloadURL = ref.getDownloadURL();


   

  }
  
  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }



}
