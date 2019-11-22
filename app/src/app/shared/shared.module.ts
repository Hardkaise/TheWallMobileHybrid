import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';


const routes: Routes = [

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
  ], exports: [HeaderComponent, FooterComponent]
})
export class SharedModule {}
