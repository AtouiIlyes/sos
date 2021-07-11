import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FamilyMemberService } from 'src/app/services/data/family-member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-family-group',
  templateUrl: './family-group.component.html',
  styleUrls: ['./family-group.component.scss'],
})
export class FamilyGroupComponent implements OnInit {
  @ViewChild('addMemberForm') addMemberForm: NgForm;
  members = [{ name: '', phone_number: '' }];
  message =
    "Je suis en cas d'urgence, je suis dans cette postion ; latitude : x,xx et Longitude : x,xx";
  phonePatern = new RegExp(/((\+|00)216)?\s*\d{2}\s*\d{3}\s*\d{3}$/);
  memberSubscription: Subscription = new Subscription();
  messageSubscription: Subscription = new Subscription();

  constructor(private familyMemberService: FamilyMemberService) {
    this.validationRulesPhone = this.validationRulesPhone.bind(this);
    this.memberSubscription =
      this.familyMemberService.observableMembers.subscribe((items: any) => {
        if (items !== undefined) {
          if (items.length > 0) {
            this.members = items;
          } else {
            this.members = [{ name: '', phone_number: '' }];
          }
        }
      });
    this.messageSubscription =
      this.familyMemberService.observableMessage.subscribe((item: any) => {
        if (item !== undefined) {
          this.message = item.message;
        }
      });
  }

  ngOnInit(): void {
    this.familyMemberService.getFamilyMembers();
    this.familyMemberService.getMessage();
  }

  addMember() {
    console.log('hi');
    if (this.members.length < 3) {
      this.members.push({ name: '', phone_number: '' });
    } else {
      Swal.fire('Vous pouvez ajouter seulement 3 membres !', '', 'info');
    }
  }

  addNewMember(member) {
    console.log(member);
    this.familyMemberService.addMember(member);
  }

  removeMember(phone, i) {
    this.familyMemberService.deleteMember(phone);
  }

  updateMessage() {
    this.familyMemberService.addMessage(this.message);
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
