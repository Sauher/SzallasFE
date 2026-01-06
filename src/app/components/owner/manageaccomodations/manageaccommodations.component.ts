import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { APIService } from '../../../services/api.service';
import { Accommodation } from '../../../interfaces/accommodation';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '../../../pipes/currency.pipe';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-manageaccommodations',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,FormsModule],
  templateUrl: './manageaccommodations.component.html',
  styleUrl: './manageaccommodations.component.scss'
})
export class ManageaccommodationsComponent {
  
     constructor(
    private apiService: APIService,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ModifyModal: any
  moreInfo:any
  UpdatedAccomodation:Accommodation ={
    id: 0,
    name: '',
    description: '',
    address: '',
    capacity: 0,
    basePrice: 0,
    active: false,
    createdAt: new Date()
  }
  loggedUser:User={
    id:0,
    name: '',
    email: '',
    password: '',
    role: ''
  };
  loadingModify = false;

  ngOnInit(): void {
    this.ModifyModal = new bootstrap.Modal('#ModifyModal');
    this.moreInfo = new bootstrap.Modal('#moreInfo');
    this.loggedUser=this.authService.loggedUser()[0];
    this.getAccommodations();

  }

  selectedAccommodation: Accommodation = {
    id: 0,
    name: '',
    description: '',
    address: '',
    capacity: 0,
    basePrice: 0,
    active: true,
    createdAt: new Date(),
  }

  openMoreInfo(accommodation: Accommodation): void {
    this.selectedAccommodation = accommodation;
    this.moreInfo.show();
  }
  accommodations: Accommodation[] = [];

  getAccommodations() {
    this.apiService.Select(`accommodations/owner_Id/eq`, this.loggedUser.id!).then(res => {
      this.accommodations = res.data;

      this.accommodations.forEach(accommodation => {
        accommodation.imageUrl = `dump_acc_img.png`;
      });
    }).catch(error => {
      this.messageService.show('warning', 'Error fetching accommodations: ' + error.message, 'error');
    });

  }
  modifyAccommodation(accommodation: Accommodation) {
    this.selectedAccommodation = { ...accommodation };
    this.ModifyModal.show();
    
  }
  saveAccommodationChanges() {
    this.UpdatedAccomodation = { id: this.selectedAccommodation.id, name: this.selectedAccommodation.name, description: this.selectedAccommodation.description, address: this.selectedAccommodation.address, capacity: this.selectedAccommodation.capacity, basePrice: this.selectedAccommodation.basePrice, active: this.selectedAccommodation.active, createdAt: this.selectedAccommodation.createdAt };
    this.loadingModify = true;
    this.apiService.Update('accommodations', this.UpdatedAccomodation.id, this.UpdatedAccomodation).then(res => {
      this.loadingModify = false;
      if (res.status == 500) {
        this.messageService.show('danger', 'Hiba', 'Hiba történt a módosításkor');
        return;
      }
      this.messageService.show('success', 'Siker',  'Szállás sikeresen módosítva');
      this.getAccommodations();
      this.ModifyModal.hide();
    });
  }
  }
  
