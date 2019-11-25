import { Component } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router  } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { ApiServiceAxios } from 'src/app/services/apiServiceAxios.service';
import { ApiService } from 'src/app/services/api.service';


// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  enter: boolean = false;
  public like_btn = {
    color: 'black',
    icon_name: 'md-heart'
  };
  constructor(private router : Router,
    private apiAxios: ApiServiceAxios,
    private androidPermissions: AndroidPermissions,
    private camera: Camera,
    public photoService: PhotoService,
    private apiService: ApiService
    ) { }
  
  ngOnInit() {
    this.apiService.isAuth().then(payload => {
      console.log(payload)
    })
    // if (this.photoService.feedData.length === 0) {
    this.fillData();
    // }
  } 
  fillData() {
    this.photoService.feedData = [];
    this.apiService.watch('images', {
      query: {
        $sort: {
          createdAt: -1
        }
      }
    }).subscribe(async value => {
      console.log(value)
      let data = [];
      for (let i in value.data) {
        const item = value.data[i];
        this.apiService.get('upload-images', item['fileId']).then(p =>{
          this.apiService.get('users', item['ownerId']).then(d => {
            this.photoService.feedData.push({
              _id: item['_id'],
              username: d['userName'],
              ownerId: item['ownerId'],
              img: p['uri'],
              fileId: item['fileId'],
            });
          })
                
        })
            
      }
      console.log(this.photoService.feedData)
      // this.photoService.feedData = value.data
    });
  }
  capturedSnapURL:string;
 
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
 
  goCommentary(index) {
    console.log(index);
    console.log(this.photoService.feedData[index])
    this.photoService.pos = index;
    this.photoService.id = this.photoService.feedData[index]._id;
    console.log(this.photoService.feedData[index]); 
    this.router.navigateByUrl('/commentary/'+ this.photoService.feedData[index]._id);

  }
  async takeSnap() {
    try {
      const imageData = await this.camera.getPicture(this.cameraOptions);
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
      // this.apiAxios.create('upload-images', {uri: base64Image})
      this.apiService.create('upload-images', {uri: base64Image}).then(payload => {
        console.log(payload);
        this.apiAxios.create('images', {ownerId: this.apiService.currentUserId, fileId: payload['_id']})
        .then(p => {
          console.log(p);
          this.fillData()
      }).catch(err => {console.log(err)})
      }).catch(err => {
        console.log(err);
      })
      return base64Image;
    }
    catch (err) {
      console.log(err);
    }
  }
  async takePicture() {

    console.log('permission')
    // await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //   result => {
    //     console.log('Has permission?',result.hasPermission)
    //     if (result.hasPermission) this.takeSnap();
    //     this.enter = true;
    //   },
    //   err => {

    //     console.log(err);
    //     console.log('here err');
    //     this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then(res => {
    //       console.log(res);
    //      if (res.hasPermission) this.takeSnap();
    //      this.enter = true;

    //     },err => {
    //       console.log(err);
    //       console.log('here err');
          
    //     })
       
    //   })
    // if (this.enter === false && this.capturedSnapURL === undefined) 
    this.takeSnap(); 
    console.log("her")
    console.log(this.capturedSnapURL);
  }


  getFile() {
  //   console.log()
  //   console.log(this.capturedSnapURL);
  //   if (this.capturedSnapURL) 
  //   this.photoService.feedData.push({
  //     img : this.capturedSnapURL,
  //     title: "pushed",
  //     like: "32"
  //   })
  //   console.log(this.capturedSnapURL);
  }

  openDetailsWithService(index : number) {
    console.log(index);
    console.log(this.photoService.feedData[index])
    this.photoService.pos = index;
    this.photoService.id = this.photoService.feedData[index]._id;
    console.log(this.photoService.feedData[index]);
    this.router.navigateByUrl('/details/'+ this.photoService.feedData[index]._id);
  }
}


