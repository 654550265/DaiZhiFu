import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OperationInstructionsPage } from './operation-instructions.page';

const routes: Routes = [
  {
    path: '',
    component: OperationInstructionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperationInstructionsPage]
})
export class OperationInstructionsPageModule {}
