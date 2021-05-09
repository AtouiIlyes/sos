import { Injectable } from "@angular/core";
import { SERVER_LIST } from "../staticVars";
@Injectable({
  providedIn: "root",
})
export class UtilsService {
  serverList = SERVER_LIST;
  constructor() {}

  getServerUrl() {
    return localStorage.getItem("serverUrl");
  }

  setServerUrl(serverUrl:any) {
    return localStorage.setItem("serverUrl", serverUrl);
  }

  getFullUrl(url:any) {
    let server:any = this.serverList.find(
      (server) => server.url === localStorage.getItem("serverUrl")
    );
    return server.fullPath + url;
  }

  checkLogin() {
    let userName = localStorage.getItem("login");
    if (userName === undefined || userName === null) {
      return false;
    }
    return true;
  }


  isEmptyObject(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }
}
