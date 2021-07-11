import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UrgenceService } from 'src/app/services/data/urgence.service';

@Component({
  selector: 'app-call-help',
  templateUrl: './call-help.component.html',
  styleUrls: ['./call-help.component.scss'],
})
export class CallHelpComponent implements OnInit {
  constructor(
    private urgence: UrgenceService,
    public dialogRef: MatDialogRef<CallHelpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.urgence.observableUrgence.subscribe((item) => {
      if (item != undefined) {
        this.dialogRef.close();
        Swal.fire('Urgence en route', 'la police est en route', 'success');
      }
    });
  }

  ngOnInit(): void {}

  askHelp(): void {
    this.urgence.askForHelp({
      typeUrgence: this.data.typeUrgence,
      lat: this.data.latLng.lat,
      lon: this.data.latLng.lng,
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
