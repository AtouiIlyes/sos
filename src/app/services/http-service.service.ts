import { UtilsService } from './data/utils.service';
import { Observable } from 'rxjs';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  response: any;
  constructor(
    public platform: Platform,
    public ngHttp: HttpClient,
    public http: HTTP,
    private utils: UtilsService
  ) {}

  postResponse(url: any, body: any, options: any) {
    if (this.platform.is('desktop')) {
      return this.ngHttp.post(url, body, options);
    } else {
      let urlForMobile = this.utils.getFullUrl(url);
      return new Observable((observer) => {
        this.http
          .post(urlForMobile, body, options)
          .then((resp) => {
            observer.next(JSON.parse(resp.data));
            observer.complete();
          })
          .catch((err) => {
            const x = new HttpErrorResponse({
              error: err,
              headers: new HttpHeaders(err.headers),
              status: err.status,
              url: err.url,
            });
            observer.error(x);
          });
      });
    }
  }
}
