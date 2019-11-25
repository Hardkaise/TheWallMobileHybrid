import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
 
  private _feedData: any[] = [];
  private _id: string;
  private _pos: number = 0;
  constructor() { }
  
  setIdPosArray(_id: any, index: any) {
    throw new Error("Method not implemented.");
  }
  set feedData(feedData: any[]) {
    this._feedData = feedData;
  }
  set id(id: string) {
    this._id = id;
  }

  set pos(pos: number) {
    this._pos = pos;
  }

  get feedData(): any[] {
    return this._feedData;
  }
  get id(): string {
    return this._id;
  }
  get pos(): number {
    return this._pos;
  }
  getfeedDataByid(id: string) {
    console.log(this._pos);
    console.log();
    // if (this._feedData.length === 0) {
    //   this.fakeData();

    // }
    if (this.feedData[this._pos]._id === id) {
      return this.feedData[this._pos]
    }
    /// data not found in array
    console.log("data not found in array");
  }
  fakeData() {
    this.feedData.push({
      _id: "lel",
      username: "username",
      img: "assets/img/cat.jpg",
      title: "hello",
      like: "33"
    })
  
    this.feedData.push({
      _id: "fuck",
      username: "username",
      img: "assets/img/index.jpg",
      title: "test",
      like: "33"
    })
    this.feedData.push({
      _id: "motherfucker",
      username: "username",
      img: "assets/img/cat.jpg",
      title: "hello",
      like: "33"
    }) 
   }

}
