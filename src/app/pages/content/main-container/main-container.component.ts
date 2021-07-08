import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Subscription, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { NAV_ROUTE } from './nav-route';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/services/data/utils.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnDestroy {
  routeTitle: string = "";
  nav_router: Array<any> = [];
  sub_Menu: Array<any> = [];
  numberAlert: number;
  subscription: Subscription;
  numberAlertEnergy: number;
  sumNumberAlert: number;
  energySubscription: Subscription;
  subUserNumberAlertSubscription: Subscription;

  login: string;
  permissions = [];
  subUser = false;
  checkLogin = false;
  lang = ["en", "fr"];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public utils: UtilsService
  ) {
    this.checkLogin = this.utils.checkLogin();
    let userName = localStorage.getItem("login");
    this.login = this.checkLogin ? userName : "LOG IN";
    for (let nav of NAV_ROUTE) {
      if (userName === undefined || userName === null) {
        if (![9999].includes(nav.id)) {
          this.nav_router.push(nav);
        }
      } else {
        this.nav_router = NAV_ROUTE;
      }
    }
    router.events.subscribe((val: any) => {
      if (val.url !== undefined) {
        if (val.url !== "/login" && val.url !== "/") {
          this.routeTitle = this.nav_router.find(
            (nav) => nav.routeLink === val.url
          ).routeTitle;
        } else {
          if (val.url === "/") {
            this.routeTitle = this.nav_router.find(
              (nav) => nav.routeLink === val.urlAfterRedirects
            ).routeTitle;
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authService.closeChangePass();
  }

  logout() {
    localStorage.removeItem("login");
    this.router.navigate(["login"]);
    this.checkLogin = this.utils.checkLogin();
    let userName = localStorage.getItem("login");
    this.login = this.checkLogin ? userName : "LOG IN";
    this.nav_router = [];
    for (let nav of NAV_ROUTE) {
      if (![1, 6, 8, 9, 10, 11].includes(nav.id)) {
        this.nav_router.push(nav);
      }
    }
  }

  logIn() {
    if (!this.checkLogin) {
      //this.authService.logout();
      this.router.navigate(["login"]);
    }
  }

  isMatIcon(icon: string) {
    if (icon.startsWith("bw_")) {
      return false;
    }
    return true;
  }

  getIconPath(icon: string) {
    return "./assets/img/icon/" + icon.split("bw_")[1] + ".svg";
  }

  closeNavSide(drawer) {
    if (window.innerWidth < 1000) {
      drawer.close();
    }
  }

  openHistoryAlerts() {}
}
