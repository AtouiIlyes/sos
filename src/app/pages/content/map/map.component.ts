import { AfterViewInit, OnDestroy } from '@angular/core';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Subscription } from 'rxjs';
import { ZoneService } from 'src/app/services/data/zone.service';
import { UtilsService } from 'src/app/services/data/utils.service';

import { loadMessages, locale } from 'devextreme/localization';
import { fr } from 'src/app/services/data/fr';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  myMap: any;
  isLoading = true;
  urgenceDepartments = [
    {
      id: 1,
      lat: 36.809285,
      lon: 9.956684,
      name: 'centre de police',
      type: 'police',
    },
    {
      id: 2,
      lat: 35.822267,

      lon: 10.500871,
      name: 'Caserne de pompiers',
      type: 'fire_station',
    },
  ];
  zones = [];
  zoneSubscription: Subscription = new Subscription();
  filteredZoneSubscription: Subscription = new Subscription();
  activeLayerGroup: any;
  layerGroups: any[];
  iconPolice = L.icon({
    iconUrl: './assets/img/icon/icon_map_snowflake.svg',
    iconSize: [60, 75],
    iconAnchor: [15, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    compileMessage: true,
  });
  iconFire = L.icon({
    iconUrl: './assets/img/icon/icon_map_fire.svg',
    iconSize: [60, 75],
    iconAnchor: [15, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    compileMessage: true,
  });
  markersCluster: any;
  color = '#ffaa00';

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    public zoneService: ZoneService,
    public utilsService: UtilsService
  ) {
    loadMessages(fr);
    locale('fr');
    this.layerGroups = [];
    this.activeLayerGroup = L.featureGroup([]);
    this.layerGroups.push(this.activeLayerGroup);
    // this.zoneSubscription = this.zoneService.observableZoneWithFrigos.subscribe(
    //   (items: any) => {
    //     if (items !== undefined) {
    //       if (this.myMap !== undefined) {
    //         this.initMarkerCluster();
    //         for (let item of items) {
    //           this.updateMapCluster(item.frigos);
    //           let geoJsonData = JSON.parse(item.geometry);
    //           if (geoJsonData.length !== 0) {
    //             if (!this.utilsService.isEmptyObject(geoJsonData)) {
    //               this.fromGeoJson(item, geoJsonData);
    //             }
    //           }
    //         }
    //         this.myMap.addLayer(this.markersCluster);
    //       }
    //       if (this.markersCluster !== undefined) {
    //         const bounds = this.markersCluster.getBounds();
    //         if (!this.utilsService.isEmptyObject(bounds)) {
    //           this.myMap.fitBounds(bounds);
    //         }
    //       }
    //       this.isLoading = false;
    //     }
    //   }
    // );

    // this.filteredZoneSubscription = this.zoneService.observableFilteredZone.subscribe(
    //   (items: any) => {
    //     if (items !== undefined) {
    //       if (this.myMap !== undefined) {
    //         this.layerGroups = [];
    //         this.activeLayerGroup.clearLayers();
    //         if (this.markersCluster !== undefined) {
    //           this.myMap.removeLayer(this.markersCluster);
    //           this.initMarkerCluster();
    //         }
    //         for (let item of items) {
    //           this.updateMapCluster(item.frigos);
    //           let geoJsonData = JSON.parse(item.geometry);
    //           if (geoJsonData.length !== 0) {
    //             if (!this.utilsService.isEmptyObject(geoJsonData)) {
    //               this.fromGeoJson(item, geoJsonData);
    //             }
    //           }
    //         }
    //         this.layerGroups.push(this.activeLayerGroup);
    //         this.myMap.addLayer(this.markersCluster);
    //         if (this.markersCluster !== undefined) {
    //           const bounds = this.markersCluster.getBounds();
    //           if (!this.utilsService.isEmptyObject(bounds)) {
    //             this.myMap.fitBounds(bounds);
    //           }
    //         }
    //       }
    //     }
    //   }
    // );
  }
  ngOnDestroy(): void {
    this.zoneSubscription.unsubscribe();
  }

  initMarkerCluster() {
    let that = this;
    this.markersCluster = L.markerClusterGroup({
      iconCreateFunction(cluster) {
        let casesCount = cluster.getChildCount();
        return L.divIcon({
          html: L.Util.template(that.getSvg(that.color, casesCount)),
          className: 'cluster',
          iconSize: casesCount > 9999999 ? 90 : casesCount > 9999 ? 70 : 50,
        });
      },
    });
  }

  fromGeoJson(zone, geoJsonData) {
    geoJsonData.features.map((feature) => {
      if (feature.geometry.type === 'Polygon') {
        let points = [];
        feature.geometry.coordinates[0].map((coordinate) => {
          let point = [];
          // reverse geojson x,y to LatLng
          point.push(coordinate[1]);
          point.push(coordinate[0]);
          points.push(point);
        });
        L.polygon(points)
          .bindPopup(
            `<div class='popup-custom-bloc-data'><strong class='title'> ${zone.nom}</strong></div>`
          )
          .addTo(this.activeLayerGroup);
      }
      if (
        feature.geometry.type === 'Point' &&
        feature.properties.radius !== undefined
      ) {
        L.circle(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          { radius: feature.properties.radius }
        )
          .bindPopup(
            `<div class='popup-custom-bloc-data'><strong class='title'>Name</strong>: ${zone.nom} </div>`
          )
          .addTo(this.activeLayerGroup);
      }
    });
  }

  ngOnInit(): void {
    // this.zoneService.importZonesWithFrigos();
  }

  updateMapCluster(frigos) {
    for (let frigo of frigos) {
      this.drawFrigo(frigo);
    }
  }

  getSvg(color, casesCount) {
    let svgIconP1 =
      '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41"><defs><style>.cls-m-1{fill:#fff; opacity:0.21;}.cls-m-2{fill:' +
      color +
      ';}';
    let cls = '.cls-m-3{font-size:11px;';
    let svgIconP2 =
      ';fill:#fff;font-family:Lato-Bold, Lato;}</style></defs><circle class="cls-m-1" cx="20.5" cy="20.5" r="20"/><circle class="cls-m-2" cx="20.5" cy="20.5" r="17.03704"/>';
    let svgIconP3 = '';
    switch ((casesCount + '').length) {
      case 1:
        cls = '.cls-m-16{font-size:16px';
        svgIconP3 = '<text class="cls-m-16" transform="translate(15 27)">';
        break;
      case 2:
        cls = '.cls-m-16{font-size:16px';
        svgIconP3 = '<text class="cls-m-16" transform="translate(11 27)">';
        break;
      case 3:
        cls = '.cls-m-12{font-size:12px';
        svgIconP3 = '<text class="cls-m-12" transform="translate(9 26)">';
        break;
      case 4:
        cls = '.cls-m-12{font-size:12px';
        svgIconP3 = '<text class="cls-m-12" transform="translate(7 26)">';
        break;
      case 5:
        cls = '.cls-m-10{font-size:10px';
        svgIconP3 = '<text class="cls-m-10" transform="translate(6 26)">';
        break;
      case 6:
        cls = '.cls-m-8{font-size:8px';
        svgIconP3 = '<text class="cls-m-8" transform="translate(6 25)">';
        break;
      case 7:
        cls = 'cls-m-7{font-size:7px';
        svgIconP3 = '<text class="cls-7" transform="translate(6 25)">';
        break;
      case 8:
        cls = 'cls-m-6{font-size:6px';
        svgIconP3 = '<text class="cls-m-6" transform="translate(7 25)">';
        break;
    }
    return (
      svgIconP1 + cls + svgIconP2 + svgIconP3 + casesCount + '</text></svg>'
    );
  }

  ngAfterViewInit(): void {
    this.myMap = L.map('mapid', {
      zoom: 6,
      minZoom: 2,
      layers: this.layerGroups,
    }).setView([34.551117, 9.369019], 5);
    L.tileLayer('http://mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}').addTo(
      this.myMap
    );
    setTimeout(() => {
      if (this.myMap !== undefined) {
        this.layerGroups = [];
        this.activeLayerGroup.clearLayers();
        this.initMarkerCluster();
        this.updateMapCluster(this.urgenceDepartments);
        if (this.markersCluster !== undefined) {
          const bounds = this.markersCluster.getBounds();
          if (!this.utilsService.isEmptyObject(bounds)) {
            this.myMap.fitBounds(bounds);
          }
        }
        this.myMap.addLayer(this.markersCluster);
        let that = this;
        this.myMap.locate({
          setView: true,
          maxZoom: 16,
          watch: true,
          enableHighAccuracy: true,
        });
        this.myMap.on('locationfound', (e) => {
          let radius = e.accuracy;
          L.marker(this.randomizeLocation(e.latitude, e.longitude), {
            icon: this.getIcon('police'),
          })
            .addTo(this.myMap)
            .bindPopup('You are within ' + radius + ' meters from this point')
            .openPopup();

          L.circle(e.latlng, radius / 2).addTo(this.myMap);
        });
        this.myMap.on('locationerror', (e) => {
          alert(e.message);
        });
        this.isLoading = false;
      }
    }, 2000);
  }

  drawFrigo(data) {
    // const compFactory = this.resolver.resolveComponentFactory(
    //   FrigoCardComponent
    // );
    // this.compFrigoRef = compFactory.create(this.injector);
    // this.compFrigoRef.instance.frigo = data;
    // this.compFrigoRef.changeDetectorRef.detectChanges();

    // // example of parent-child communication

    // let div = document.createElement("div");
    // div.appendChild(this.compFrigoRef.location.nativeElement);
    let div;
    let marker = L.marker(this.randomizeLocation(data.lat, data.lon), {
      icon: this.getIcon(data.type),
    })
      .bindPopup('hello')
      .addTo(this.markersCluster);
  }

  getIcon(type) {
    let icon = this.iconPolice;
    switch (type) {
      case 'police':
        icon = this.iconPolice;
        break;
      case 'fire_station':
        icon = this.iconFire;
        break;
    }
    return icon;
  }

  randomizeLocation(lat, lon) {
    let random = (Math.random() * 5) / 111111; // 1/111111 === one meter
    if (Math.random() > 0.5) {
      random = -random;
    }
    random = random * 0; // eliminate randomize function
    return [Number(lat) + random, Number(lon) + random];
  }
}
