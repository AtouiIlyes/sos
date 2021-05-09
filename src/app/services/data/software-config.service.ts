import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { HttpService } from "../http-service.service";
import { HEADERS_OPTIONS } from "../staticVars";

let device: any = [];

@Injectable({
  providedIn: "root",
})
export class SoftwareConfigService {
  observableDevice: BehaviorSubject<any[]>;

  constructor(
    private auth: AuthService,
    public platform: Platform,
    private httpService: HttpService
  ) {
    this.observableDevice = new BehaviorSubject<any>(device);
  }

  deviceEventChange() {
    this.observableDevice.next(device);
  }

  importDeviceInfo(idDevice) {
    let body = new URLSearchParams();
    const data = '{"type":0,"id_device":"' + idDevice + '"}';
    body.set("data", data);
    return this.httpService
      .postResponse(
        "api/syncsoft",
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
          device = JSON.parse(JSON.stringify(res));
          this.deviceEventChange();
        },
        (err) => {
          if (err.status === 403) {
            this.auth.logout();
          }
        }
      );
  }

  synchroniseDevice(deviceInfo: any) {
    let body = new URLSearchParams();
    const data =
      '{"type":1,"id_device":"' +
      deviceInfo.id_device +
      '","id_gtw":"' +
      deviceInfo.gtw +
      '","delivery_delay":"' +
      deviceInfo.delivery_delay +
      '"}';

    body.set("data", data);
    return this.httpService.postResponse(
      "api/syncsoft",
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

  clearDeviceInfo() {
    device = undefined;
    this.deviceEventChange();
  }
}
