import { MatButtonModule } from "@angular/material/button";
import { ServiceModule } from "./../../../services/services.module";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { LayoutModule } from "@angular/cdk/layout";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";
import {
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorModule,
} from "devextreme-angular";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    ServiceModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxSelectBoxModule,
  ],
})
export class LoginModule {}
