import { Component, OnInit } from '@angular/core';
import {ApiServiceAxios} from '../../../services/apiServiceAxios.service'
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { access } from 'fs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private apiAxios : ApiServiceAxios, private nativeStorage: NativeStorage, private router : Router) { }
  errorMessage: string = "";
  ngOnInit() {
  }
  login(form: any){
    this.errorMessage = "";
    console.log(form.form.value);
    const value = form.form.value;
    const data = {
      email: value.email,
      password: value.password,
      strategy: 'local'
    }
    this.apiAxios.login('authentication', data).then(payload => {
      console.log(payload.data.accessToken);
      this.apiAxios.token = payload.data.accessToken;
      this.setInNativeStorage('accessToken', payload.data.accessToken)
      this.router.navigateByUrl('home');
    }).catch(err => {
      console.log("wrong password or login");
      this.errorMessage = "wrong password or login";
    })
  }
  setInNativeStorage(name: string, data: any) {
    this.nativeStorage.setItem(name, data)
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }
}
