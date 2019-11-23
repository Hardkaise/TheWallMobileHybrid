import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PhotoResolverService } from './resolver/photo-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile/profile.module').then(m => m.ProfilePageModule)
  },
  { path: 'register', loadChildren: () => import('./page/auth/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'login', loadChildren: () => import('./page/auth/login/login.module').then(m => m.LoginPageModule) },

  { path: 'setting', loadChildren: () => import('./page/setting/setting.module').then(m => m.SettingPageModule) },
  {
    path: 'details/:id', loadChildren: './page/details/details.module#DetailsPageModule',
    resolve: {
      special: PhotoResolverService
    },
  },
  { path: 'add-friend', loadChildren: './page/add-friend/add-friend.module#AddFriendPageModule' },
  { path: 'commentary', loadChildren: './page/commentary/commentary.module#CommentaryPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
