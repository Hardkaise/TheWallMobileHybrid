import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileData: any= {};
  constructor(public api : ApiService, public photoService: PhotoService) {  
    // photoService.fakeData();
  }

  ngOnInit() {
    console.log(this.api.infoUser)
    this.api.get('upload-images', this.api.infoUser.picture).then(payload => {
     this.profileData.profileImg = payload['uri'];
    })
    // this.profileData = {
    //   profileImg : "assets/img/index.jpg",
    // }
  }

}
