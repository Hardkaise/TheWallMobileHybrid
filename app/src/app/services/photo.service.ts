import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  setIdPosArray(_id: any, index: any) {
    throw new Error("Method not implemented.");
  }
  private _feedData: any[] = [];
  private _id: string;
  private _pos: number = 0;
  constructor() { }

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
    console.log(this._feedData);
    if (this.feedData[this._pos]._id === id) {
      return this.feedData[this._pos]
    }
    this.fakeData();
    /// data not found in array
    console.log("data not found in array");
  }
  fakeData() {
    throw new Error("Method not implemented.");
  }

}
