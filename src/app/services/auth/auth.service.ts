import { HEADERS_OPTIONS } from './../../services/staticVars';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http-service.service';
import { Platform } from '@ionic/angular';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    public platform: Platform
  ) {}

  signinUser(loginData: any) {
    this.httpService
      .postResponse(
        'api/login?email=' +
          loginData.username +
          '&password=' +
          loginData.password +
          '&GMT_PLUS=0',
        {},
        this.platform.is('mobile')
          ? HEADERS_OPTIONS
          : {
              headers: new HttpHeaders().set(
                'X-Timezone-Offset',
                this.getTimezoneOffset()
              ),
            }
      )
      .subscribe(
        (data: any) => {
          if (data.Result === 1) {
            this.login(data.lastName + ' ' + data.firstName);
            this.router.navigate(['urgence']);
          } else {
            Swal.fire('Vérifier vos identifiants de connexion!', '', 'error');
          }
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

  signUpUser(loginData: any) {
    let body = new URLSearchParams();
    const dataBody =
      '{"type":1' +
      ',"email":' +
      loginData.username +
      ',"password":' +
      loginData.password +
      ',"firstName":' +
      loginData.firstName +
      ',"lastName":' +
      loginData.lastName +
      '}';
    body.set('data', dataBody);
    this.httpService
      .postResponse(
        'api/infra/users',
        dataBody,
        this.platform.is('mobile')
          ? HEADERS_OPTIONS
          : {
              headers: new HttpHeaders().set(
                'X-Timezone-Offset',
                this.getTimezoneOffset()
              ),
            }
      )
      .subscribe(
        (data: any) => {
          Swal.fire('compte ajouté avec succés', '', 'success');
          this.router.navigate(['login']);
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

  getTimezoneOffset() {
    return String(new Date().getTimezoneOffset());
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(localStorage.getItem('jwtToken') !== null);
      }, 800);
    });
    return promise;
  }

  login(login: any) {
    localStorage.setItem('login', login);
  }

  closeChangePass() {
    this.snackBar.dismiss();
  }

  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['login']);
  }
}
