import { Component, OnInit,  } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.page.html',
  styleUrls: ['./commentary.page.scss'],
})
export class CommentaryPage implements OnInit {

  constructor(private router: Router) { }
  prevPage() {
    this.router.navigateByUrl('/home');
  }
  ngOnInit() {
  }

}
