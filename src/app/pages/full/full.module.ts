import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullRoutingModule } from './full-routing.module';
import { FullComponent } from './full.component';


@NgModule({
  declarations: [FullComponent],
  imports: [
    CommonModule,
    FullRoutingModule
  ]
})
export class FullModule { }
