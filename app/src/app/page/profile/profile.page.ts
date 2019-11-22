import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private profileData: any= {};
  constructor(private photoService: PhotoService) {  
    photoService.fakeData();
  }

  ngOnInit() {
    this.profileData = {
      username: "test",
      profileImg : "assets/img/index.jpg",
      email : "a@a.a",
      details: "hello i'm here"
    }
  }

}
