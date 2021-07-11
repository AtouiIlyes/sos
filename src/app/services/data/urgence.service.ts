import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http-service.service';
import { HEADERS_OPTIONS } from '../staticVars';
let urgence: any = undefined;

@Injectable({
  providedIn: 'root',
})
export class UrgenceService {
  observableUrgence: BehaviorSubject<any[]>;

  constructor(
    private router: Router,
    public platform: Platform,
    private auth: AuthService,
    private httpService: HttpService
  ) {
    this.observableUrgence = new BehaviorSubject<any>(urgence);
  }

  askForHelp(help) {
    let body = new URLSearchParams();
    const data =
      '{"type":1,"typeUrgence":"' +
      help.typeUrgence +
      '",lat:' +
      help.lat +
      ',lon:' +
      help.lon +
      '}';
    body.set('data', data);
    return this.httpService
      .postResponse(
        '/api/urgence',
        this.platform.is('mobile') ? { data: data } : body.toString(),
        this.platform.is('mobile')
          ? HEADERS_OPTIONS
          : {
              headers: new HttpHeaders().set(
                'Content-Type',
                'application/x-www-form-urlencoded;charset=UTF-8'
              ),
            }
      )
      .subscribe(
        (res: any) => {
          urgence = JSON.parse(JSON.stringify(res));
          this.eventChange();
        },
        (err) => {
          if (err.status === 403) {
            this.auth.logout();
          }
        }
      );
  }

  eventChange() {
    this.observableUrgence.next(urgence);
  }
}
