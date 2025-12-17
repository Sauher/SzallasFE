import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent implements OnInit {

  ngOnInit(): void {
    this.searchFilter();
    
  }

  searchTerm: string = '';
  priceOrder: 'asc' | 'desc' = 'asc';
  capacityOrder: 'asc' | 'desc' = 'asc';

  accommodations = [
    { id: 1, name: 'Hotel Sunshine', address: '123 Sunny St, Beach City', capacity: 2, price: 120, imageUrl: 'logo' },
    { id: 2, name: 'Mountain Retreat', address: '456 Mountain Rd, Hill Town', capacity: 4, price: 200, imageUrl: 'logo' },
    { id: 3, name: 'City Lights Inn', address: '789 Urban Ave, Metropolis', capacity: 3, price: 150, imageUrl: 'logo' },
    { id: 4, name: 'Lakeside Lodge', address: '321 Lakeview Dr, River City', capacity: 5, price: 250, imageUrl: 'logo' },
    { id: 5, name: 'Desert Oasis', address: '654 Desert Rd, Sand Town', capacity: 2, price: 130, imageUrl: 'logo' },
    { id: 6, name: 'Forest Haven', address: '987 Forest Ln, Woodsville', capacity: 4, price: 220, imageUrl: 'logo' },
    { id: 7, name: 'Coastal Comfort', address: '147 Ocean Blvd, Shore City', capacity: 3, price: 160, imageUrl: 'logo' },
    { id: 8, name: 'Urban Escape', address: '258 City St, Downtown', capacity: 2, price: 140, imageUrl: 'logo' },
    { id: 9, name: 'Countryside Inn', address: '369 Country Rd, Farmville', capacity: 5, price: 240, imageUrl: 'logo' },
    { id: 10, name: 'Island Paradise', address: '159 Island Dr, Tropical City', capacity: 4, price: 300, imageUrl: 'logo' },
    { id: 11, name: 'Hilltop Hotel', address: '753 Hill St, Summit Town', capacity: 3, price: 180, imageUrl: 'logo' },
    { id: 12, name: 'Riverfront Resort', address: '852 River Rd, Water City', capacity: 5, price: 270, imageUrl: 'logo' },
    { id: 13, name: 'Garden View Inn', address: '951 Garden Ln, Floral Town', capacity: 2, price: 110, imageUrl: 'logo' },
    { id: 14, name: 'Sunset Suites', address: '357 Sunset Blvd, Twilight City', capacity: 4, price: 230, imageUrl: 'logo' },
    { id: 15, name: 'Winter Wonderland', address: '258 Snowy Rd, Frost Town', capacity: 3, price: 190, imageUrl: 'logo' },
    { id: 16, name: 'Springtime Stay', address: '147 Blossom St, Bloom City', capacity: 2, price: 115, imageUrl: 'logo' },
    { id: 17, name: 'Autumn Acres', address: '369 Leaf Ln, Harvest Town', capacity: 5, price: 260, imageUrl: 'logo' },
    { id: 18, name: 'Seaside Sanctuary', address: '456 Wave Rd, Bay City', capacity: 4, price: 280, imageUrl: 'logo' },
  ];


  searchFilter(): void {
    const originalAccommodations = this.accommodations;
    const term = this.searchTerm.toLowerCase();
    this.accommodations = this.accommodations.filter(accommodation =>
      accommodation.name.toLowerCase().includes(term) || accommodation.address.toLowerCase().includes(term)

    );
    if(this.accommodations.length === 0){
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

    if (property === 'price') {
      this.priceOrder = order;
    } else if (property === 'capacity') {
      this.capacityOrder = order;
    }
  }

  toggleOrder(property: 'price' | 'capacity'){
    if(property === 'price'){
      const next = this.priceOrder === 'asc' ? 'desc' : 'asc';
      this.orderBy('price', next);
    } else {
      const next = this.capacityOrder === 'asc' ? 'desc' : 'asc';
      this.orderBy('capacity', next);
    }
  }
}
