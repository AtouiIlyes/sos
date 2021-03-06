import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http-service.service';
import { HEADERS_OPTIONS } from '../staticVars';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

let user: any = undefined;
let healthCard: any = undefined;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  observableUsers: BehaviorSubject<any[]>;
  observableHealthCard: BehaviorSubject<any[]>;

  constructor(
    private router: Router,
    public platform: Platform,
    private auth: AuthService,
    private httpService: HttpService
  ) {
    this.observableUsers = new BehaviorSubject<any>(user);
    this.observableHealthCard = new BehaviorSubject<any>(healthCard);
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

  getUserHealthCard() {
    let body = new URLSearchParams();
    const data = '{"type":3}';
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
          healthCard = JSON.parse(JSON.stringify(res));
          this.eventHealthCardChange();
        },
        (err) => {
          if (err.status === 403) {
            this.auth.logout();
          }
        }
      );
  }

  updateUser(userData: any) {
    let body = new URLSearchParams();
    const dataBody =
      '{"type":2' +
      ',"id":"' +
      userData.id +
      '","address":"' +
      userData.address +
      '","city":"' +
      userData.city +
      '","phone":"' +
      userData.phone +
      '","birthDate":"' +
      userData.birthDate +
      '","firstName":"' +
      userData.firstName +
      '","lastName":"' +
      userData.lastName +
      '"}';
    body.set('data', dataBody);
    this.httpService
      .postResponse(
        'api/infra/users',
        this.platform.is('mobile') ? { data: dataBody } : body.toString(),
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
        (data: any) => {
          localStorage.setItem('user', JSON.stringify(data));
          user = JSON.parse(JSON.stringify(data));
          this.eventChange();
          Swal.fire('compte modifi?? avec succ??s', '', 'success');
        },
        (err) => {
          Swal.fire(
            "une erreur s'est produite lors de l'authentification!",
            err.message,
            'error'
          );
        }
      );
  }

  updateHealthUser(userData: any) {
    let body = new URLSearchParams();
    const dataBody =
      '{"type":4' +
      ',"id":"' +
      userData.id +
      '","anaphylaxis":' +
      userData.anaphylaxis +
      ',"epipen":"' +
      userData.epipen +
      '","diabetes":"' +
      userData.diabetes +
      '","organ_donor":"' +
      userData.organ_donor +
      '","family_doctor":"' +
      userData.family_doctor +
      '","blood_group":"' +
      userData.blood_group +
      '","doctor":"' +
      userData.doctor +
      '"}';
    body.set('data', dataBody);
    this.httpService
      .postResponse(
        'api/infra/users',
        this.platform.is('mobile') ? { data: dataBody } : body.toString(),
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
        (data: any) => {
          healthCard = JSON.parse(JSON.stringify(data));
          this.eventHealthCardChange();
          Swal.fire('fiche sant?? modifi??e avec succ??s', '', 'success');
        },
        (err) => {
          Swal.fire(
            "une erreur s'est produite lors de l'authentification!",
            err.message,
            'error'
          );
        }
      );
  }

  eventChange() {
    this.observableUsers.next(user);
  }

  eventHealthCardChange() {
    this.observableHealthCard.next(healthCard);
  }
}
