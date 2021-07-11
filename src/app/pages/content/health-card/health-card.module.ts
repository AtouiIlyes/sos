import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthCardRoutingModule } from './health-card-routing.module';
import { HealthCardComponent } from './health-card.component';
import { DxFormModule, DxLookupModule, DxRadioGroupModule, DxSelectBoxModule, DxTagBoxModule, DxTextBoxModule } from 'devextreme-angular';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [HealthCardComponent],
  imports: [
    CommonModule,
    HealthCardRoutingModule,
    DxFormModule,
    DxRadioGroupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxLookupModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class HealthCardModule { }
