import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PhotoResolverService } from './resolver/photo-resolver.service';
import { AuthGuard } from './guard/auth.guard';
import { CommentResolverService } from './resolver/comment-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  { path: 'register', loadChildren: () => import('./page/auth/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'login', loadChildren: './page/auth/login/login.module#LoginPageModule' },

  {
    path: 'setting', loadChildren: () => import('./page/setting/setting.module').then(m => m.SettingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:id', loadChildren: './page/details/details.module#DetailsPageModule',
    resolve: {
      special: PhotoResolverService
    },
  },
  {
    path: 'add-friend', loadChildren: './page/add-friend/add-friend.module#AddFriendPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'commentary/:id', loadChildren: './page/commentary/commentary.module#CommentaryPageModule',
    canActivate: [AuthGuard],
    resolve: {
      special: CommentResolverService
    },
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
