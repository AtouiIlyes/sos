import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http-service.service';
import { HEADERS_OPTIONS } from '../staticVars';

let diag: any = undefined;

@Injectable({
  providedIn: 'root',
})
export class UrgenceDepartmentsService {
  observableUrgenceDepartments: BehaviorSubject<any[]>;

  constructor(
    public platform: Platform,
    private auth: AuthService,
    private httpService: HttpService
  ) {
    this.observableUrgenceDepartments = new BehaviorSubject<any>(diag);
  }

  getUrgenceDepartments() {
    let body = new URLSearchParams();
    const data = '{"type":0}';
    body.set('data', data);
    return this.httpService
      .postResponse(
        '/api/infra/departments',
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
          diag = JSON.parse(JSON.stringify(res));
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
    this.observableUrgenceDepartments.next(diag);
  }
}
