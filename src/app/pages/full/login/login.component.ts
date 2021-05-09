import { UtilsService } from "./../../../services/data/utils.service";
import { SERVER_LIST } from "./../../../services/staticVars";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  data: any;
  serverList = SERVER_LIST;
  modePW = "password";
  @ViewChild("loginForm", { static: true }) loginForm: NgForm = new NgForm([], []); ;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utils: UtilsService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.serverList.length === 1) {
      this.loginForm.value.serverUrl = this.serverList[0].url;
    }
    if (
      this.loginForm.value.login !== "" &&
      this.loginForm.value.password !== "" &&
      this.loginForm.value.serverUrl !== undefined &&
      this.loginForm.value.serverUrl !== null
    ) {
      this.utils.setServerUrl(this.loginForm.value.serverUrl);
      this.authService.signinUser({
        username: this.loginForm.value.login.toLowerCase(),
        password: this.loginForm.value.password,
        serverUrl: this.loginForm.value.serverUrl,
      });
    } else if (
      this.loginForm.value.serverUrl === undefined ||
      this.loginForm.value.serverUrl === null
    ) {
      Swal.fire("Veuillez SVP choisir un serveur", "", "error");
    } else {
      Swal.fire("Vérifier vos identifiants de connexion!", "", "error");
    }
  }

  changeModePassword() {
    if (this.modePW === "password") {
      this.modePW = "text";
    } else {
      this.modePW = "password";
    }
  }
}
