import { Component } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  feedData: any[] = [];
  constructor(    private androidPermissions: AndroidPermissions,    private camera: Camera) { }
  
  ngOnInit() {  
    this.fakeData()
  } 

  fakeData() {
    this.feedData.push({
      img: "assets/img/cat.jpg",
      title: "hello",
      like: "33"
    })
  
    this.feedData.push({
      img: "assets/img/index.jpg",
      title: "test",
      like: "33"
    })
    this.feedData.push({
      img: "assets/img/cat.jpg",
      title: "hello",
      like: "33"
    })
  }
  capturedSnapURL:string;
 
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
 
 
  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {
      
      console.log(err);
      // Handle error
    });
  }
  takePicture() {
    console.log('permission')
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => {
        console.log('Has permission?',result.hasPermission)
        if (result.hasPermission) this.takeSnap();
      
      },
      err => {
        console.log(err);
        console.log('here err');
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then(res => {
          console.log(res);
         if (res.hasPermission) this.takeSnap();

        },err => {
          console.log(err);
          console.log('here err');
        })
       
      })
    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS])

    console.log(this.capturedSnapURL);
  }
  getFile() {
    console.log()
  }
}
