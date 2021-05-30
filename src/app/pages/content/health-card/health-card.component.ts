import { Component, OnInit } from '@angular/core';
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
  user: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Heart',
    birthDate: new Date(1964, 2, 16),
    address: '351 S Hill St.',
    city: 'Los Angeles',
    state: 'CA',
    zipcode: '90013',
    phone: '+1(213) 555-9392',
    email: 'jheart@dx-email.com',
    skype: 'jheart_DX_skype',
  };
  items = ['oui', 'non'];
  bloodType = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  constructor() {}

  ngOnInit(): void {}
}
