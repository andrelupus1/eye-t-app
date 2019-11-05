import { PopoverComponent } from './../../components/popover/popover.component';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NotificarPage } from './notificar.page';

const routes: Routes = [
  {
    path: '',
    component: NotificarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [PopoverComponent],
  declarations: [NotificarPage, PopoverComponent]
})
export class NotificarPageModule {}
