import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.css"]
})
export class SnackbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToConfig() {
    this.router.navigate(["/configAccount"]);
  }
}
