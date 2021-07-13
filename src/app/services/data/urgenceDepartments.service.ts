import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http-service.service';
import { HEADERS_OPTIONS } from '../staticVars';

let departments: any = undefined;
let nomDepartment: string;
let typeDepartment: any;
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
    this.observableUrgenceDepartments = new BehaviorSubject<any>(departments);
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
          departments = JSON.parse(JSON.stringify(res));
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
    this.observableUrgenceDepartments.next(this.filterDepartments());
  }

  clearFilter() {
    nomDepartment = '';
    typeDepartment = '';
    this.eventChange();
  }

  setFilter(type: string, value: any) {
    switch (type) {
      case 'nomDepartment': {
        nomDepartment = value;
        break;
      }
      case 'typeDepartment': {
        typeDepartment = value;
        break;
      }
    }
    this.eventChange();
  }

  filterDepartments() {
    let zonesFilterd = [];
    if (departments !== undefined && departments !== null) {
      zonesFilterd = JSON.parse(JSON.stringify(departments));
    }
    if (this.checkFilterValue(nomDepartment)) {
      let filteredZoneByFrigoName = zonesFilterd.filter((department) =>
        department.name.toLowerCase().includes(nomDepartment)
      );
      zonesFilterd = JSON.parse(JSON.stringify(filteredZoneByFrigoName));
    }

    if (this.checkFilterValue(typeDepartment)) {
      if (typeDepartment.length > 0) {
        let filteredZoneByFrigoType = zonesFilterd.filter((department) =>
          typeDepartment.includes(department.role)
        );

        zonesFilterd = JSON.parse(JSON.stringify(filteredZoneByFrigoType));
      }
    }

    return zonesFilterd;
  }

  checkFilterValue(value) {
    if (value !== undefined && value !== null && value !== '') {
      return true;
    }
    return false;
  }
}
