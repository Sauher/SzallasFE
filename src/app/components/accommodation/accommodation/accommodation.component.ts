import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { Accommodation } from '../../../interfaces/accommodation';
import { Router, RouterModule } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, FormsModule, RouterModule],
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent implements OnInit {

  constructor(
    private apiService: APIService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.modal = new bootstrap.Modal('#moreInfo');
    this.getAccommodations();

  }

  modal: any;

  selectedAccommodation: Accommodation | null = null;

  openMoreInfo(accommodation: Accommodation): void {
    this.selectedAccommodation = accommodation;
    this.modal.show();
  }

  searchTerm: string = '';
  priceOrder: 'asc' | 'desc' = 'asc';
  capacityOrder: 'asc' | 'desc' = 'asc';


  //id	name	description	address	capacity	basePrice	active	createdAt	
  accommodations: Accommodation[] = [];
  allAccommodations: Accommodation[] = [];

  getAccommodations() {
    this.apiService.SelectAll('accommodations').then(res => {
      this.allAccommodations = res.data || [];
      this.accommodations = [...this.allAccommodations];

      this.accommodations.forEach(accommodation => {
        if (accommodation.imageUrl) {
          accommodation.imageUrl = `http://localhost:3000/uploads/${accommodation.imageUrl}`;
        }
      });
    }).catch(error => {
      this.messageService.show('warning', 'Error fetching accommodations: ' + error.message, 'error');
    });

    //image get

  }



  searchFilter(): void {
    const term = (this.searchTerm || '').toLowerCase().trim();
    if (!term) {
      this.accommodations = [...this.allAccommodations];
      return;
    }

    this.accommodations = this.allAccommodations.filter(accommodation => {
      const name = (accommodation.name || '') as string;
      const address = (accommodation.address || '') as string;
      return name.toLowerCase().includes(term) || address.toLowerCase().includes(term);
    });


  }


  orderBy(property: string, order: 'asc' | 'desc'): void {
    const sorted = [...this.accommodations].sort((a, b) => {
      const av = a[property as keyof typeof a] as any;
      const bv = b[property as keyof typeof b] as any;
      if (av < bv) return order === 'asc' ? -1 : 1;
      if (av > bv) return order === 'asc' ? 1 : -1;
      return 0;
    });
    this.accommodations = sorted;

    if (property === 'basePrice') {
      this.priceOrder = order;
    } else if (property === 'capacity') {
      this.capacityOrder = order;
    }
  }

  toggleOrder(property: 'basePrice' | 'capacity') {
    if (property === 'basePrice') {
      const next = this.priceOrder === 'asc' ? 'desc' : 'asc';
      this.orderBy('basePrice', next);
    } else {
      const next = this.capacityOrder === 'asc' ? 'desc' : 'asc';
      this.orderBy('capacity', next);
    }
  }

  @Output() accommodationSelected = (accommodation: Accommodation) => {
    this.selectedAccommodation = accommodation;
  }

  booking() {
    if (this.selectedAccommodation) {
  this.modal.hide();
  this.router.navigate(['/booking'], { queryParams: { id: this.selectedAccommodation.id } });
    }
  }
}
