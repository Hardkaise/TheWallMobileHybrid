import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ApiServiceAxios } from '../services/apiServiceAxios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate/*, CanActivateChild, CanLoad */ {
  constructor(private api: ApiService, private router: Router, private apiAxios: ApiServiceAxios, ) {

  }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if (this.apiAxios.isAuth()) {
      //   return true;
      // }
       return this.api.isAuth()
    .then(res => {
      console.log(res)
      if (!res) {
        return this.router.navigate(['/login']);
      }
      return res;
    });
    //  return this.router.navigate(['/authentication']);
   

  }
  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.api.isAuth()
      .then(res => {
        console.log(res)
        if (!res) {
          return this.router.navigate(['/login']);
        }
        return res;
      });  }
}
