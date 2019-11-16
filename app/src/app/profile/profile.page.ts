import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private profileData: any= {};
  constructor() {

  }

  ngOnInit() {
    this.profileData = {
      username: "test",
      profileImg : "assets/img/index.jpg",
      email : "a@a.a",
    }
  }
}
