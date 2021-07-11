import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/data/user.service';
export class User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  email: string;
  skype: string;
}
@Component({
  selector: 'app-health-card',
  templateUrl: './health-card.component.html',
  styleUrls: ['./health-card.component.scss'],
})
export class HealthCardComponent implements OnInit {
  user: User;
  healthCard: any = {
    anaphylaxis: 'oui',
    epipen: 0,
    blood_group: 'A+',
    doctor: 'A+',
    diabetes: 0,
    organ_donor: 0,
    family_doctor: 0,
  };
  userSubscription: Subscription = new Subscription();
  healthCardSubscription: Subscription = new Subscription();
  items = ['oui', 'non'];
  bloodType = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  constructor(private userService: UserService) {
    this.userSubscription = this.userService.observableUsers.subscribe(
      (item: any) => {
        if (item !== undefined) {
          this.user = item;
        }
      }
    );
    this.healthCardSubscription =
      this.userService.observableHealthCard.subscribe((item: any) => {
        if (item !== undefined) {
          this.healthCard = item;
        }
      });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUserHealthCard();
  }

  updateForm() {
    console.log(this.user);
    this.userService.updateUser(this.user);
  }

  updateHealthForm() {
    console.log(this.healthCard);
    this.userService.updateHealthUser(this.healthCard);
  }
}
