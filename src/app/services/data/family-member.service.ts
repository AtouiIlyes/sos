import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http-service.service';
import { HEADERS_OPTIONS } from '../staticVars';
import { HttpHeaders } from '@angular/common/http';

let member: any = undefined;
let message: any = undefined;
@Injectable({
  providedIn: 'root',
})
export class FamilyMemberService {
  observableMembers: BehaviorSubject<any[]>;
  observableMessage: BehaviorSubject<any[]>;

  constructor(
    private router: Router,
    public platform: Platform,
    private auth: AuthService,
    private httpService: HttpService
  ) {
    this.observableMembers = new BehaviorSubject<any>(member);
    this.observableMessage = new BehaviorSubject<any>(message);
  }

  getFamilyMembers() {
    let body = new URLSearchParams();
    const data = '{"type":0}';
    body.set('data', data);
    return this.httpService
      .postResponse(
        '/api/family_member',
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
          member = JSON.parse(JSON.stringify(res));
          this.eventChange();
        },
        (err) => {
          if (err.status === 403) {
            this.auth.logout();
          }
        }
      );
  }

  addMember(userData: any) {
    let body = new URLSearchParams();
    const dataBody =
      '{"type":1' +
      ',"phone_number":"' +
      userData.phoneNumber +
      '","name":"' +
      userData.name +
      '"}';
    body.set('data', dataBody);
    this.httpService
      .postResponse(
        'api/family_member',
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
          member = JSON.parse(JSON.stringify(data));
          this.eventChange();
          Swal.fire('Membre ajouté avec succés', '', 'success');
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

  deleteMember(phone_number: any) {
    let body = new URLSearchParams();
    const data = '{"type":2, "phone_number":"' + phone_number + '"}';
    body.set('data', data);
    return this.httpService
      .postResponse(
        '/api/family_member',
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
          member = JSON.parse(JSON.stringify(res));
          Swal.fire("Membre supprimé avec succés", '', 'success');
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
    this.observableMembers.next(member);
  }

  getMessage() {
    let body = new URLSearchParams();
    const data = '{"type":3}';
    body.set('data', data);
    return this.httpService
      .postResponse(
        '/api/family_member',
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
          message = JSON.parse(JSON.stringify(res));
          this.eventMessageChange();
        },
        (err) => {
          if (err.status === 403) {
            this.auth.logout();
          }
        }
      );
  }

  addMessage(message: any) {
    let body = new URLSearchParams();
    const dataBody = '{"type":4' + ',"message":"' + message + '"}';
    body.set('data', dataBody);
    this.httpService
      .postResponse(
        'api/family_member',
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
          member = JSON.parse(JSON.stringify(data));
          this.eventChange();
          Swal.fire("Message d'urgence modifié avec succés", '', 'success');
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

  eventMessageChange() {
    this.observableMessage.next(message);
  }
}
