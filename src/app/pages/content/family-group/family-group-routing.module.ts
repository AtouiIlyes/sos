import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyGroupComponent } from './family-group.component';

const routes: Routes = [{ path: '', component: FamilyGroupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyGroupRoutingModule { }
