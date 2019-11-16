import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  feedData: any[] = [];
  constructor() { }
  
  ngOnInit() {
    this.fakeData()
  } 

  fakeData() {
    this.feedData.push({
      img: "assets/img/cat.jpg",
      title: "hello",
      like: "33"
    })
  
    this.feedData.push({
      img: "assets/img/index.jpg",
      title: "test",
      like: "33"
    })
    this.feedData.push({
      img: "assets/img/cat.jpg",
      title: "hello",
      like: "33"
    })


  }
}
