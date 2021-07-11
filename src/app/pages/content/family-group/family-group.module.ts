import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyGroupRoutingModule } from './family-group-routing.module';
import { FamilyGroupComponent } from './family-group.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DxTextAreaModule, DxValidatorModule, DxButtonModule, DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [FamilyGroupComponent],
  imports: [
    CommonModule,
    FamilyGroupRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    DxTextAreaModule,
    DxButtonModule,
    DxTextBoxModule,
    DxValidatorModule
  ],
})
export class FamilyGroupModule {}
