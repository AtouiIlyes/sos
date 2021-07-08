import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallHelpComponent } from './call-help/call-help.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openUrgenceDialog(help) {
    const dialogRef = this.dialog.open(CallHelpComponent, {
      width: window.innerWidth < 720 ? '100%' : window.innerWidth / 1.05 + 'px',
      height: window.innerWidth < 720 ? '100%' : 'auto',
      data:  help ,
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
