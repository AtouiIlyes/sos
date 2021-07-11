import { UtilsService } from "../../../../services/data/utils.service";
import { SERVER_LIST } from "../../../../services/staticVars";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  data: any;
  @ViewChild("loginForm", { static: true }) loginForm: NgForm = new NgForm([], []); ;
  modePW = "password";

  constructor(
    private router: Router,
    private authService: AuthService,
    private utils: UtilsService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (
      this.loginForm.value.email !== "" &&
      this.loginForm.value.password !== "" &&
      this.loginForm.value.firstName !== "" &&
      this.loginForm.value.id !== "" &&
      this.loginForm.value.lastName !== ""
    ) {
      this.authService.signUpUser({
        id: this.loginForm.value.id,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        firstName: this.loginForm.value.firstName,
        lastName: this.loginForm.value.lastName,
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

}
