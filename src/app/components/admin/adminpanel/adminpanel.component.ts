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
  imports: [CommonModule,RouterModule,FormsModule],
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
  ModifyModal: any
  ModifyUserModal: any

  selectedUser: User = {
    id: 0,
    name: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    role: 'user',
  };
  selectedAccommodation: Accommodation = {
    id: 0,
    name: '',
    address: '',
    capacity: 0,
    basePrice: 0,
    imageUrl: '',
    description: '',
    active: false,
    createdAt: new Date(),
  }
  loadingModify = false;



  accommodations: Accommodation[] = [];
  ngOnInit(): void {
    this.getUsers(); 
    this.getAccommodations();
    this.AccommodationModal = new bootstrap.Modal('#AccommodationModal');
    this.UserModal = new bootstrap.Modal('#UserModal');
    this.ModifyModal = new bootstrap.Modal('#ModifyModal');
    this.ModifyUserModal = new bootstrap.Modal('#ModifyUserModal');
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
  getAccommodations(){
    this.api.SelectAll('accommodations').then(res =>{
      if(res.status == 500){
        this.message.show('danger','Hiba',res.message!)
        return []
      }
      this.accommodations = res.data
      return
  }
  );
  }
  modifyUser(user: User) {
    this.selectedUser = { ...user };
    this.ModifyUserModal.show();
  }

  deleteUser(userId: number | undefined) {
    if (!userId) {
      this.message.show('danger', 'Hiba', 'Érvénytelen felhasználó ID');
      return;
    }

    if (confirm('Biztosan törölni szeretnéd ezt a felhasználót?')) {
      this.api.Delete('users', userId).then(res => {
        if (res.status == 500) {
          this.message.show('danger', 'Hiba', res.message || 'Hiba történt a törléskor');
          return;
        }
        this.message.show('success', 'Siker', res.message || 'Felhasználó sikeresen törölve');
        this.getUsers(); 
      });
    }
  }

  modifyAccommodation(accommodation: Accommodation) {
    this.selectedAccommodation = { ...accommodation };
    this.ModifyModal.show();
    
  }
  saveAccommodationChanges() {
    this.loadingModify = true;
    this.api.Update('accommodations', this.selectedAccommodation.id, this.selectedAccommodation).then(res => {
      this.loadingModify = false;
      if (res.status == 500) {
        this.message.show('danger', 'Hiba', 'Hiba történt a módosításkor');
        return;
      }
      this.message.show('success', 'Siker',  'Szállás sikeresen módosítva');
      this.getAccommodations();
      this.ModifyModal.hide();
    });
  }
  saveUserChanges() {
    this.loadingModify = true;
    this.api.Update('users', this.selectedUser.id!, this.selectedUser).then(res => {
      this.loadingModify = false;
      if (res.status == 500) {
        this.message.show('danger', 'Hiba', 'Hiba történt a módosításkor');
        return;
      }
      this.message.show('success', 'Siker',  'Felhasználó sikeresen módosítva');
      this.getUsers();
      this.ModifyUserModal.hide();
    });
  }

  deleteAccommodation(accommodationId: number | undefined) {
    if (!accommodationId) {
      this.message.show('danger', 'Hiba', 'Érvénytelen szállás ID');
      return;
    }

    if (confirm('Biztosan törölni szeretnéd ezt a szállást?')) {
      this.api.Delete('accommodations', accommodationId).then(res => {
        if (res.status == 500) {
          this.message.show('danger', 'Hiba', res.message || 'Hiba történt a törléskor');
          return;
        }
        this.message.show('success', 'Siker', res.message || 'Szállás sikeresen törölve');
        this.accommodations = this.accommodations.filter(a => a.id !== accommodationId);
      });
    }
  }

}