import { AuthService } from "./../../services/auth/auth.service";
import { HttpService } from "./../../services/http-service.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Platform } from "@ionic/angular";
import { HEADERS_OPTIONS } from "../staticVars";
import { HttpHeaders } from "@angular/common/http";

let diag: any = undefined;

@Injectable({
  providedIn: "root",
})
export class LoraDaigService {
  observableDiag: BehaviorSubject<any[]>;

  constructor(
    private auth: AuthService,
    public platform: Platform,
    private httpService: HttpService
  ) {
    this.observableDiag = new BehaviorSubject<any>(diag);
  }

  diagEventChange() {
    this.observableDiag.next(diag);
  }

  getDiag(idDevice: string, idGTW: string) {
    let body = new URLSearchParams();
    const data =
      '{"type":0,"id_device":"' + idDevice + '","id_gtw":"' + idGTW + '"}';
    body.set("data", data);
    return this.httpService
      .postResponse(
        "api/loradiag",
        this.platform.is("mobile") ? { data: data } : body.toString(),
        this.platform.is("mobile")
          ? HEADERS_OPTIONS
          : {
              headers: new HttpHeaders().set(
                "Content-Type",
                "application/x-www-form-urlencoded;charset=UTF-8"
              ),
            }
      )
      .subscribe(
        (res: any) => {
          diag = JSON.parse(JSON.stringify(res));
          this.diagEventChange();
        },
        (err) => {
          if (err.status === 403) {
            this.auth.logout();
          }
        }
      );
  }

  validateDiag(
    diag: any,
    idDevice: string,
    idGTW: string,
    typeBat: string,
    batValue: number
  ) {
    let body = new URLSearchParams();
    const data =
      '{"type":1,"id_device":"' +
      idDevice +
      '","id_gtw":"' +
      idGTW +
      '","diag":{"has_bat":' +
      diag.hasBat +
      ',"bat_value":' +
      diag.batt +
      ',"bat_diag":' +
      batValue +
      ',"bat_type":"' +
      typeBat +
      '","snr":' +
      diag.snr +
      ',"rssi":' +
      diag.rssi +
      ',"distance":"' +
      diag.distance +
      '","quality":"' +
      diag.quality +
      '"}}';
    body.set("data", data);
    return this.httpService.postResponse(
      "api/loradiag",
      this.platform.is("mobile") ? { data: data } : body.toString(),
      this.platform.is("mobile")
        ? HEADERS_OPTIONS
        : {
            headers: new HttpHeaders().set(
              "Content-Type",
              "application/x-www-form-urlencoded;charset=UTF-8"
            ),
          }
    );
  }

  clearDiag() {
    diag = undefined;
    this.diagEventChange();
  }
}
