import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CameraUtils } from './utils/camera.utils';
import { Camera } from '@ionic-native/camera/ngx';
// import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    CameraUtils,
    Camera,
    AndroidPermissions,
    // File,
    // Storage,
    FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent, ]
})
export class AppModule {}
