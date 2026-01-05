import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { Accommodation } from '../../../interfaces/accommodation';

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent implements OnInit {

  constructor(
    private apiService: APIService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.getAccommodations();

  }

  selectedAccommodation: Accommodation | null = null;

  openMoreInfo(accommodation: Accommodation): void {
    this.selectedAccommodation = accommodation;
  }

  searchTerm: string = '';
  priceOrder: 'asc' | 'desc' = 'asc';
  capacityOrder: 'asc' | 'desc' = 'asc';


  //id	name	description	address	capacity	basePrice	active	createdAt	
  accommodations: Accommodation[] = [];

  getAccommodations() {
    this.apiService.SelectAll('accommodations').then(res => {
      this.accommodations = res.data;

      this.accommodations.forEach(accommodation => {
        accommodation.imageUrl = `dump_acc_img.png`;
      });
    }).catch(error => {
      this.messageService.show('warning', 'Error fetching accommodations: ' + error.message, 'error');
    });

    //image get

  }

  searchFilter(): void {
    const originalAccommodations = this.accommodations;
    const term = this.searchTerm.toLowerCase();
    this.accommodations = this.accommodations.filter(accommodation =>
      accommodation.name.toLowerCase().includes(term) || accommodation.address.toLowerCase().includes(term)

    );
    if (this.accommodations.length === 0) {
      // Optionally, handle the case where no accommodations match the search term
      this.accommodations = originalAccommodations;

      this.ngOnInit();
    }


  }


  orderBy(property: string, order: 'asc' | 'desc'): void {
    // create a sorted copy instead of mutating in place
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
}
