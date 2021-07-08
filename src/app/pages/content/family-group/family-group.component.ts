import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-family-group',
  templateUrl: './family-group.component.html',
  styleUrls: ['./family-group.component.scss'],
})
export class FamilyGroupComponent implements OnInit {
  @ViewChild('addMemberForm') addMemberForm: NgForm;
  members = [{ nom: '', phoneNumber: '' }];
  message =
    "Je suis en cas d'urgence, je suis dans cette postion ; latitude : x,xx et Longitude : x,xx";
  phonePatern = new RegExp(/((\+|00)216)?\s*\d{2}\s*\d{3}\s*\d{3}$/);

  constructor() {
    this.validationRulesPhone = this.validationRulesPhone.bind(this);
  }

  ngOnInit(): void {}

  addMember() {
    this.members.push({ nom: '', phoneNumber: '' });
  }

  onNoClick() {}

  onSubmit() {}

  validationRulesPhone(event) {
    if (event.value === undefined || event.value === null) {
      return true;
    }
    if (event.value === '') {
      return true;
    }
    return this.phonePatern.test(event.value);
  }
}
