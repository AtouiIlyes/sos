import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthCardRoutingModule } from './health-card-routing.module';
import { HealthCardComponent } from './health-card.component';
import { DxFormModule, DxRadioGroupModule, DxSelectBoxModule, DxTagBoxModule, DxTextBoxModule } from 'devextreme-angular';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from "@angular/material/tabs";


@NgModule({
  declarations: [HealthCardComponent],
  imports: [
    CommonModule,
    HealthCardRoutingModule,
    DxFormModule,
    DxRadioGroupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class HealthCardModule { }
