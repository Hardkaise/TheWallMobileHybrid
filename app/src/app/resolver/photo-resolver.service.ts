import { Injectable } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhotoResolverService {

  constructor(private dataService: PhotoService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');
    console.log(id);
    console.log(this.dataService.getfeedDataByid(id))
    return this.dataService.getfeedDataByid(id);
  }
}
