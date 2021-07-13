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
    { id: 'all', value: 'Tous' },
    { id: 'police', value: 'Police' },
    { id: 'fire_station', value: 'Pompiers' },
    { id: 'ambulence', value: 'Ambulance' },
    { id: 'samu', value: 'SAMU' },
  ];
  constructor(
    @Inject(DOCUMENT) public document,
    private zoneService: ZoneService,
    private urgenceDepartment: UrgenceDepartmentsService,
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
      this.urgenceDepartment.setFilter("typeDepartment", zoneEspace.value);
    } else {
      this.urgenceDepartment.setFilter("typeDepartment", []);
    }
  }

  nomFrigoChanged(nomFrigo: any) {
    if (nomFrigo.value !== null) {
      this.urgenceDepartment.setFilter("nomDepartment", nomFrigo.value.toLowerCase());
    } else {
      this.urgenceDepartment.setFilter("nomDepartment", "");
    }
  }



  clearFilter() {
    this.nomEspace = "";
    this.nomDevice = "";
    this.zone = "";
    this.zoneService.clearFilter();
  }
}
