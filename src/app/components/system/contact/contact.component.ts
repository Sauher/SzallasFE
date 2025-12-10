import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactUs } from '../../../interfaces/contactUs';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor(
    private api: APIService,
    private message: MessageService
  ) { }

  contact:ContactUs={
    name: "",
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
    this.api.sendMail(this.contact).then(res=>{
      if(res.status==500){
        this.message.show('danger', 'Hiba', res.message!);
        return
      }
      this.message.show('success', 'Siker', res.message!);
      this.contact={
        name: "",
        email: "",
        subject: "",
        message: ""
      };
    })
  }

}
