import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.page.html',
  styleUrls: ['./commentary.page.scss'],
})
export class CommentaryPage implements OnInit {
  id: string;
  data: [];
  comments: any = [];
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }
  prevPage() {
    this.router.navigateByUrl('/home');
  }
  ngOnInit() {
    console.log(this.route.snapshot.data);
    if (this.route.snapshot.data['special']) {
      this.id = this.route.snapshot.data['special'];
      console.log(this.id);
      this.apiService.watch('image-commentaries', {
        query: {
          $sort: {
            createdAt: -1
          }
        }
      }).subscribe(async value => {
        console.log(value);
        for (let i in value.data) {
          const item = value.data[i];
          this.apiService.get('users', item['ownerId']).then(d => {
            this.apiService.get('upload-images', d['picture']).then(p => {
              this.comments.push({
                _id: item['_id'],
                username: d['userName'],
                ownerId: item['ownerId'],
                text: item['text'],
                picture: p['uri']
              }).catch(err => {
                this.comments.push({
                  _id: item['_id'],
                  username: d['userName'],
                  ownerId: item['ownerId'],
                  text: item['text'],
                  picture: "assets/img/index.jpg"
                });
              });
            });

          });
        }
      })
    }
  }
}
