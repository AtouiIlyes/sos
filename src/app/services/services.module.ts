import { PwaService } from "./data/pwa.service";
import { NgModule } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth-guard.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { VersionCheckService } from "./version/version-check.service";
import { SnackbarComponent } from "./auth/snackbar/snackbar.component";
import { UtilsService } from "./data/utils.service";
import { HttpService } from "./http-service.service";

@NgModule({
  imports: [CommonModule, HttpClientModule, MatSnackBarModule],
  providers: [
    AuthService,
    AuthGuard,
    VersionCheckService,
    PwaService,
    UtilsService,
  ],
  declarations: [SnackbarComponent],
  entryComponents: [SnackbarComponent],
})
export class ServiceModule {}
