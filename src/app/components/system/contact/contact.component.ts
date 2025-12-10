import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactUs } from '../../../interfaces/contactUs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contact:ContactUs={
    email: "",
    subject: "",
    message: ""
  };

  errors:string[]=[
    "Foglalási problémák",
    "Számlázási kérdések",
    "Általános információk",
    "Visszajelzés",
    "Egyéb"
  ];

  sendContact(){
    console.log(this.contact);
  }

}
