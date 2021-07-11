import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallHelpComponent } from './call-help/call-help.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  myMap: any;
  latLng: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.myMap = L.map('mapid', {
      zoom: 6,
      minZoom: 2,
    }).setView([34.551117, 9.369019], 5);
    L.tileLayer('http://mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}').addTo(
      this.myMap
    );

    this.myMap.locate({
      setView: true,
      maxZoom: 16,
      watch: true,
      enableHighAccuracy: true,
    });
    this.myMap.on('locationfound', (e) => {
      let radius = e.accuracy;
      this.latLng = e.latlng;
      console.log(e);
    });
  }

  openUrgenceDialog(help) {
    this.myMap.locate({
      setView: true,
      maxZoom: 16,
      watch: true,
      enableHighAccuracy: true,
    });
    this.myMap.on('locationfound', (e) => {
      let radius = e.accuracy;
      console.log(e);
    });
    const dialogRef = this.dialog.open(CallHelpComponent, {
      width: window.innerWidth < 720 ? '100%' : window.innerWidth / 1.05 + 'px',
      height: window.innerWidth < 720 ? '100%' : 'auto',
      data: { ...help, latLng: this.latLng },
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
