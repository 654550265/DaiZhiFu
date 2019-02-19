import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaobaoTaskPage } from './taobao-task.page';

const routes: Routes = [
  {
    path: '',
    component: TaobaoTaskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaobaoTaskPage]
})
export class TaobaoTaskPageModule {}
