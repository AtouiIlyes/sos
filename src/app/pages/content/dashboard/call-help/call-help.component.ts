import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-call-help',
  templateUrl: './call-help.component.html',
  styleUrls: ['./call-help.component.scss'],
})
export class CallHelpComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CallHelpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  askHelp(): void {
    Swal.fire("Urgence en route","la police est en route","success")
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
