import { Component } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';


// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  feedData: any[] = [];
  enter: boolean = false;
  constructor(private router : Router,
    private androidPermissions: AndroidPermissions,    private camera: Camera) { }
  
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
 
 
  async takeSnap() {
    try {
      const imageData = await this.camera.getPicture(this.cameraOptions);
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
      return base64Image;
    }
    catch (err) {
      console.log(err);
    }
  }
  async takePicture() {
    
    console.log('permission')
    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => {
        console.log('Has permission?',result.hasPermission)
        if (result.hasPermission) this.takeSnap();
        this.enter = true;
      },
      err => {

        console.log(err);
        console.log('here err');
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then(res => {
          console.log(res);
         if (res.hasPermission) this.takeSnap();
         this.enter = true;

        },err => {
          console.log(err);
          console.log('here err');
          
        })
       
      })
    if (this.enter === false && this.capturedSnapURL === undefined) this.takeSnap(); 
    console.log("her")
    console.log(this.capturedSnapURL);


  
  }
  getFile() {
    console.log()
    console.log(this.capturedSnapURL);
    if (this.capturedSnapURL) 
    this.feedData.push({
      img : this.capturedSnapURL,
      title: "pushed",
      like: "32"
    })
    console.log(this.capturedSnapURL);


  }
}
