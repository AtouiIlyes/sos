import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';

import { MainContainerRoutingModule } from './main-container-routing.module';
import { MainContainerComponent } from './main-container.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [MainContainerComponent],
  imports: [
    CommonModule,
    MainContainerRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule
  ]
})
export class MainContainerModule { }
