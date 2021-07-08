import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http-service.service';
import { HEADERS_OPTIONS } from '../staticVars';

let user: any = undefined;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  observableUsers: BehaviorSubject<any[]>;

  constructor(
    public platform: Platform,
    private auth: AuthService,
    private httpService: HttpService
  ) {
    this.observableUsers = new BehaviorSubject<any>(user);
  }

  getUsers() {
    let body = new URLSearchParams();
    const data = '{"type":0}';
    body.set('data', data);
    return this.httpService
      .postResponse(
        '/api/infra/users',
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
          user = JSON.parse(JSON.stringify(res));
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
    this.observableUsers.next(user);
  }
}
