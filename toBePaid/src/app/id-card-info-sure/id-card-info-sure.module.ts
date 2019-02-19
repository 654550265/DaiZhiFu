import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IdCardInfoSurePage } from './id-card-info-sure.page';

const routes: Routes = [
  {
    path: '',
    component: IdCardInfoSurePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IdCardInfoSurePage]
})
export class IdCardInfoSurePageModule {}
