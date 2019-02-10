import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BindtaobaoPage } from './bindtaobao.page';

const routes: Routes = [
  {
    path: '',
    component: BindtaobaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BindtaobaoPage]
})
export class BindtaobaoPageModule {}
