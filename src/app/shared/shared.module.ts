import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FrigoFilterComponent } from "./frigo-filter/frigo-filter.component";
import {
  DxButtonModule,
  DxTagBoxModule,
  DxTextBoxModule,
} from "devextreme-angular";

@NgModule({
  declarations: [FrigoFilterComponent],
  imports: [CommonModule, DxTagBoxModule, DxTextBoxModule, DxButtonModule],
  exports: [FrigoFilterComponent],
})
export class SharedModule {}
