import { loadMessages } from "devextreme/localization";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { timeout } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";

export class Zone {
  id: string;
  nom: string;
  geometry: string;
  pined: number;
}
let zonesWithFrigos: Zone[];
let zones: Zone[];

let nomFrigo: string;
let typeFrigo: any;
let categoryFrigo: any;
let idZone: any;
let idFrigo: string;
let client: string;
@Injectable({
  providedIn: "root",
})
export class ZoneService {
  observableZone: BehaviorSubject<Zone[]>;
  observableZoneWithFrigos: BehaviorSubject<Zone[]>;
  observableFilteredZone: BehaviorSubject<Zone[]>;

  constructor(private http: HttpClient) {
    this.observableZone = new BehaviorSubject<Zone[]>(zones);
    this.observableFilteredZone = new BehaviorSubject<Zone[]>(zones);
    this.observableZoneWithFrigos = new BehaviorSubject<Zone[]>(
      zonesWithFrigos
    );
  }

  eventChangeZone() {
    this.observableZone.next(zones);
  }

  eventChangeZoneWithFrigos() {
    this.observableZoneWithFrigos.next(zonesWithFrigos);
  }

  eventFilterFrigo() {
    this.observableFilteredZone.next(this.filterFrigos());
  }

  importZonesWithFrigos() {
    let body = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded;charset=UTF-8"
      ),
    };
    const dataBody = '{"type":0}';
    body.set("data", dataBody);
    this.http
      .post("/api/infra/zone", body.toString(), options)
      .subscribe((res) => {
        zonesWithFrigos = JSON.parse(JSON.stringify(res));
        this.eventChangeZoneWithFrigos();
      });
  }

  getZones() {
    let body = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded;charset=UTF-8"
      ),
    };
    const dataBody = '{"type":1}';
    body.set("data", dataBody);
    this.http
      .post("/api/infra/zone", body.toString(), options)
      .subscribe((res) => {
        zones = JSON.parse(JSON.stringify(res));
        this.eventChangeZone();
      });
  }

  addZone(data: Zone) {
    let body = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded;charset=UTF-8"
      ),
    };
    const dataBody =
      '{"type":2,"values":[["' +
      data.nom +
      '",[],0,0,' +
      (data.pined === undefined ? 0 : data.pined) +
      "," +
      "]]}";
    body.set("data", dataBody);
    this.http
      .post("api/infra/zone", body.toString(), options)
      .subscribe((res: any) => {
        if (res.rep !== undefined) {
          Swal.fire("", "problème", "error");
        } else {
          Swal.fire("", "Zone ajouté", "success");
          zones = JSON.parse(JSON.stringify(res));
          this.eventChangeZone();
        }
      });
  }

  updateZone(data: any, id: string) {
    let body = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded;charset=UTF-8"
      ),
    };
    const dataBody =
      '{"type":3,"id":' +
      id +
      ',"nom":"' +
      data.nom +
      '","pined":' +
      (data.pined === undefined ? 0 : data.pined) +
      "}";
    body.set("data", dataBody);
    this.http
      .post("api/infra/zone", body.toString(), options)
      .subscribe((res: any) => {
        if (res.rep !== undefined) {
          Swal.fire("", "problème", "error");
        } else {
          Swal.fire("", "Zone modifié", "success");
          zones = JSON.parse(JSON.stringify(res));
          this.eventChangeZone();
        }
      });
  }

  deleteZone(id: string) {
    let body = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded;charset=UTF-8"
      ),
    };
    const dataBody = '{"type":4,id:' + id + "}";
    body.set("data", dataBody);
    this.http
      .post("api/infra/zone", body.toString(), options)
      .subscribe((res: any) => {
        if (res.rep !== undefined) {
          Swal.fire("", "problème", "error");
        } else {
          Swal.fire("", "Zone supprimé", "success");
          zones = JSON.parse(JSON.stringify(res));
          this.eventChangeZone();
          this.importZonesWithFrigos();
        }
      });
  }

  updateGeometry(geometry: any, lat, lng, id: string) {
    let body = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded;charset=UTF-8"
      ),
    };
    const dataBody =
      '{"type":5,"id":' +
      id +
      ',"geometry":' +
      geometry +
      ',"lat":' +
      lat +
      ',"lon":' +
      lng +
      "}";
    body.set("data", dataBody);
    this.http
      .post("api/infra/zone", body.toString(), options)
      .subscribe((res: any) => {
        if (res.rep !== undefined) {
          Swal.fire("", "problème", "error");
        } else {
          Swal.fire("", "Zone modifié", "success");
          zones = JSON.parse(JSON.stringify(res));
          this.eventChangeZone();
        }
      });
  }

  clearFilter() {
    idZone = [];
    nomFrigo = "";
    typeFrigo = "";
    categoryFrigo = "";
    idFrigo = "";
    client = "";
    this.eventFilterFrigo();
  }

  setFilter(type: string, value: any) {
    switch (type) {
      case "nomFrigo": {
        nomFrigo = value;
        break;
      }
      case "idFrigo": {
        idFrigo = value;
        break;
      }
      case "typeFrigo": {
        typeFrigo = value;
        break;
      }
      case "categoryFrigo": {
        categoryFrigo = value;
        break;
      }
      case "idZone": {
        idZone = value;
        break;
      }
      case "client": {
        client = value;
        break;
      }
    }
    this.eventFilterFrigo();
  }

  filterFrigos() {
    let zonesFilterd = [];
    if (zonesWithFrigos !== undefined && zonesWithFrigos !== null) {
      zonesFilterd = JSON.parse(JSON.stringify(zonesWithFrigos));
    }
    if (this.checkFilterValue(idZone)) {
      if (idZone.length > 0) {
        zonesFilterd = zonesFilterd.filter((z) =>
          idZone.includes(Number(z.id))
        );
      }
    }
    if (this.checkFilterValue(nomFrigo)) {
      let filteredZoneByFrigoName = [];
      for (let zone of JSON.parse(JSON.stringify(zonesFilterd))) {
        zone.frigos = zone.frigos.filter((frigo) =>
          frigo.nom.toLowerCase().includes(nomFrigo)
        );
        if (zone.frigos.length > 0) {
          filteredZoneByFrigoName.push(zone);
        }
      }
      zonesFilterd = JSON.parse(JSON.stringify(filteredZoneByFrigoName));
    }

    if (this.checkFilterValue(typeFrigo)) {
      if (typeFrigo.length > 0) {
        let filteredZoneByFrigoType = [];
        for (let zone of JSON.parse(JSON.stringify(zonesFilterd))) {
          zone.frigos = zone.frigos.filter((frigo) =>
            typeFrigo.includes(Number(frigo.id_type))
          );
          if (zone.frigos.length > 0) {
            filteredZoneByFrigoType.push(zone);
          }
        }
        zonesFilterd = JSON.parse(JSON.stringify(filteredZoneByFrigoType));
      }
    }

    if (this.checkFilterValue(categoryFrigo)) {
      if (categoryFrigo.length > 0) {
        let filteredZoneByFrigoCategory = [];
        for (let zone of JSON.parse(JSON.stringify(zonesFilterd))) {
          zone.frigos = zone.frigos.filter((frigo) =>
            categoryFrigo.includes(Number(frigo.id_category))
          );
          if (zone.frigos.length > 0) {
            filteredZoneByFrigoCategory.push(zone);
          }
        }
        zonesFilterd = JSON.parse(JSON.stringify(filteredZoneByFrigoCategory));
      }
    }

    if (this.checkFilterValue(client)) {
      let filteredZoneByFrigoClient = [];
      for (let zone of JSON.parse(JSON.stringify(zonesFilterd))) {
        zone.frigos = zone.frigos.filter((frigo) =>
          frigo.client.toLowerCase().includes(client)
        );
        if (zone.frigos.length > 0) {
          filteredZoneByFrigoClient.push(zone);
        }
      }
      zonesFilterd = JSON.parse(JSON.stringify(filteredZoneByFrigoClient));
    }
    return zonesFilterd;
  }

  checkFilterValue(value) {
    if (value !== undefined && value !== null && value !== "") {
      return true;
    }
    return false;
  }
}
