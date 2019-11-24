import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private api : ApiService, private router : Router) { }

  ngOnInit() {
  }
  logout() {
    this.api.logOut();
    this.router.navigateByUrl('login')
  }

}
