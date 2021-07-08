import { ZoneService } from './../../services/data/zone.service';
import { UtilsService } from "src/app/services/data/utils.service";
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import "devextreme-intl";
import { loadMessages, locale } from "devextreme/localization";
import { fr } from "../../services/data/fr";
import { Subscription } from "rxjs";
import { UrgenceDepartmentsService } from "src/app/services/data/urgenceDepartments.service";

@Component({
  selector: "app-frigo-filter",
  templateUrl: "./frigo-filter.component.html",
  styleUrls: ["./frigo-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrigoFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  customizerTogglerState = "inactive";
  zones = []
  typeEspaces: Array<any> = [];
  zoneSubscription: Subscription = new Subscription();
  frigoTypeSubscription: Subscription = new Subscription();
  frigoCategorySubscription: Subscription = new Subscription();
  showEspaceTypeFilter = false;
  activeWindow: Array<number> = [];
  nomEspace = "";
  nomDevice = "";
  client = "";
  zone = "";
  typeEspace = "";
  departmentTypes = [
    { id: 'police', value: 'Police' },
    { id: 'fire_station', value: 'Pompiers' },
    { id: 'ambulence', value: 'Ambulance' },
    { id: 'samu', value: 'SAMU' },
  ];
  constructor(
    @Inject(DOCUMENT) public document,
    private zoneService: ZoneService,
    public utils: UtilsService
  ) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.document
      .getElementById("filter-config-toggle-icon")
      .addEventListener("click", () => {
        if (this.customizerTogglerState === "inactive") {
          this.customizerTogglerState = "active";
          this.document.getElementById("customizer-test").classList.add("open");
        } else {
          this.customizerTogglerState = "inactive";
          this.document
            .getElementById("customizer-test")
            .classList.remove("open");
        }
      });
  }

  ngOnDestroy() {
    this.zoneSubscription.unsubscribe();
    this.frigoTypeSubscription.unsubscribe();
    this.frigoCategorySubscription.unsubscribe();
    this.clearFilter();
  }

  zoneFrigoSelected(zoneEspace: any) {
    if (zoneEspace.value !== null) {
      this.zoneService.setFilter("idZone", zoneEspace.value);
    } else {
      this.zoneService.setFilter("idZone", []);
    }
  }

  nomFrigoChanged(nomFrigo: any) {
    if (nomFrigo.value !== null) {
      this.zoneService.setFilter("nomFrigo", nomFrigo.value.toLowerCase());
    } else {
      this.zoneService.setFilter("nomFrigo", "");
    }
  }

  clientChanged(client: any) {
    if (client.value !== null) {
      this.zoneService.setFilter("client", client.value.toLowerCase());
    } else {
      this.zoneService.setFilter("client", "");
    }
  }

  typeFrigoSelected(typeFrigo: any) {
    if (typeFrigo.value !== null) {
      this.zoneService.setFilter("typeFrigo", typeFrigo.value);
    } else {
      this.zoneService.setFilter("typeFrigo", []);
    }
  }

  categoryFrigoSelected(categoryFrigo: any) {
    if (categoryFrigo.value !== null) {
      this.zoneService.setFilter("categoryFrigo", categoryFrigo.value);
    } else {
      this.zoneService.setFilter("categoryFrigo", []);
    }
  }

  nomDeviceChanged(nomDevice: any) {
    this.zoneService.setFilter("nomDevice", nomDevice.value.toLowerCase());
  }

  clearFilter() {
    this.nomEspace = "";
    this.nomDevice = "";
    this.zone = "";
    this.zoneService.clearFilter();
  }
}
