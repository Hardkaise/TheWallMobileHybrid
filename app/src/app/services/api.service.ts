import {Injectable} from '@angular/core';
import * as io from "socket.io-client";
import feathers, {Paginated, Service} from '@feathersjs/feathers';
import feathersSocketIOClient from '@feathersjs/socketio-client';
import feathersAuthClient from '@feathersjs/authentication-client';
import feathersRx from 'feathers-reactive/lib';
import {Observable, Subscription, from} from 'rxjs';
import {environment} from '../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {Storage} from  '@feathersjs/authentication-client';

export class FakeStorage implements Storage {
  constructor(private nativeStorage : NativeStorage) {}
  getItem(key: string): Promise<any> {
    return  new Promise((resolve, reject) => {
      if (localStorage.getItem(key)) {
          resolve(localStorage.getItem(key));
      }
      reject(new Error(''));
    });
      // return localStorage.getItem(key);
    // return this.nativeStorage.getItem(key)
  }
    setItem?(key: string, value: any): Promise<any> {

      return  new Promise((resolve, reject) => {
            resolve(localStorage.setItem(key, value));
      });


    }
  removeItem?(key: string): Promise<any> {
    throw new Error("Method not implemented.");
  }


}

export class ApiQuery {
  query: {
    [prop: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public infoUser: any;

  public currentUserId: string;
  private _feathers = feathers();
  private _socket = io(environment.API_URL);

  constructor(private fakeStorage: FakeStorage
  ) {
    this._feathers
      .configure(
        feathersSocketIOClient(
          this._socket,
          {timeout: 8000}
        )
      )
      .configure(feathersAuthClient({ storage: NativeStorage }))
      .configure(feathersRx({
        idField: '_id'
      }));

    this._socket.on('connect', () => {
      console.log('Connected on ' + environment.API_URL);
    });
  }

  public service<T>(serviceName: string): Service<T> {
    return this._feathers.service(serviceName);
  }

  public observe<T>(serviceName: string, objectId: string, query: ApiQuery): Observable<T> {
    return (this.service<T>(serviceName))['watch']()
      .get(objectId, query);
  }

  public watch<T>(serviceName: string, query: ApiQuery): Observable<Paginated<T>> {
    return (this.service(serviceName))['watch']()
      .find(query);
    // return (this._feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
    //   .service(serviceName))
    //   .watch()
    //   .find(query);

  }

  public patch<T>(serviceName: string, objectId: string, data: any): Promise<T> {
    return this.service<T>(serviceName)
      .patch(objectId, data);
  }

  public remove<T>(serviceName: string, objectId: string): Promise<T> {
    return this.service<T>(serviceName)
      .remove(objectId);
  }

  public create<T>(serviceName: string, data: any) {
    return this.service<T>(serviceName)
      .create(data);
  }

  public find<T>(serviceName: string, query: ApiQuery) {
    return this.service<T>(serviceName)
      .find(query);
  }

  get<T>(serviceName: string, objectId: string, query?: ApiQuery): Promise<T> {
    return this.service<T>(serviceName)
      .get(objectId, query);
  }

  isAuth(): Promise<boolean> {
    return this.getJWT()
      .then(jwt => this._verifyJWT(jwt))
      .then(() => this._getUserData())
      .then(() => {
        this._authenticate();
        return true;
      })
      .catch(() => false);
  }

  logOut() {
    this.currentUserId = undefined;
    return this._feathers['logout']();
  }

  getJWT() {
    return this._feathers['passport'].getJWT();
  }

  private _getUserData(token?: string): Promise<void> {
    const jwt = token ? Promise.resolve(token) : this.getJWT();

    return jwt.then(j => this._feathers['passport'].verifyJWT(j))
      .then(payload => payload.userId)
      .then(user => {
        this.currentUserId = user;
      });
  }

  signUp(userInfo) {
    return this.create('users', userInfo)
      .catch(err => {
        console.log('here');
        console.error(err);
       
        throw err;
      });
  }

  logIn(credentials) {
    return this._authenticate(credentials)
      .then(res => {
        console.log(res)
        // feathersAuthClient.setAccessToken(res.accessToken)
        // this._feathers['authenticate'].setAccessToken(res.accessToken)
        this.infoUser = res.user;
        return res;
      }).then(res => this._getUserData(res.accessToken))
      .catch(err => {
        throw err;
      });
  }

  private _authenticate(
    credentials?: { strategy: string, email: string, password: string }
  ): Promise<any> {
    return this._feathers['authenticate'](credentials);
  }

  private _verifyJWT(jwt: string) {
    return this._feathers['passport'].verifyJWT(jwt);
  }

}
