import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { Accommodation } from '../../../interfaces/accommodation';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss'
})
export class AdminpanelComponent {

  constructor(
      private api: APIService,
      private message: MessageService
    ) {}

  users: User[] = [];
  UserModal: any
  AccommodationModal: any


  accommodations: Accommodation[] = [];
  ngOnInit(): void {
    this.getUsers(); 
    this.AccommodationModal = new bootstrap.Modal('#AccommodationModal')
    this.UserModal = new bootstrap.Modal('#UserModal')
    
  }
  getUsers(){
    this.api.SelectAll('users').then(res =>{
      if(res.status == 500){
        this.message.show('danger','Hiba',res.message!)
        return []
      }
      this.users = res.data
      return
  }
  );
  }
}
