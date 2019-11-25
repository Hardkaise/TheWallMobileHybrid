import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Url } from 'url';
import axios from "axios";
export class ApiQuery {
  query: {
    [prop: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceAxios {

  public currentUserId: string;
  private url = environment.API_URL;
  public token: string = "";

  constructor(private nativeStorage: NativeStorage) { }
  public createAccount<T>(serviceName: string, data: any) {
    let url = this.url + serviceName;
    return axios.post(url, data);
  }
  public isAuth() {
    if (this.token !== "") return true;
    return false;
  }
  public async create<T>(serviceName: string, data: any) {
    let url = this.url + serviceName;
    if (this.token === "") {
      this.token = await this.getToken();
    }
    return axios.post(url, data, {
      headers: {
        Authorization: this.token
      }
    });
  }

  public login<T>(serviceName: string, form: any) {
    let url = this.url + serviceName;
    console.log(url);
    return axios.post(url, form)
  }

  public getToken() {

    return this.nativeStorage.getItem('accessToken')
      .then(
        data => {
          return data;
        },
        error => {
          console.log(error);
          return null;
        });
  }
  public async get<T>(serviceName) {
    if (this.token === "") {
      this.token = await this.getToken();
    }
    let url = this.url + serviceName;
    return axios.get(url, {
      headers: {
        Authorization: this.token
      }
    });
  }
}