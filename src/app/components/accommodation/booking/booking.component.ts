import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { APIService } from '../../../services/api.service';        
import { Accommodation } from '../../../interfaces/accommodation'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit{


  date:Date = new Date();

  @Input() accommodationSelected: Accommodation | null = null;
  selectedAccommodationId: number | null = null;
  private idFromQuery: number | null = null;
  minStartDate: string = '';

 constructor(
   private apiService: APIService,
   private messageService: MessageService,
   private route: ActivatedRoute
 ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = Number(params['id']);
      this.idFromQuery = isNaN(id) ? null : id;
      this.trySetSelected();
    });

    this.getBookingDetails();

  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  this.minStartDate = local.toISOString().slice(0, 10);
  }

 accommodations: Accommodation[] = [];

 getBookingDetails() {
   this.apiService.SelectAll('accommodations').then(res => {
     this.accommodations = res.data;
    this.trySetSelected();
   }).catch(error => {
     this.messageService.show('warning', 'Error fetching booking details: ' + error.message, 'error');
   });
 }

 private trySetSelected() {
   if (!this.idFromQuery) return;
   if (this.accommodations.length === 0) return;
   const found = this.accommodations.find(a => a.id === this.idFromQuery);
   if (found) {
     this.accommodationSelected = found;
     this.selectedAccommodationId = found.id;
   }
 }

  onAccommodationChange(id: number | null) {
    if (id == null) { this.accommodationSelected = null; return; }
    const found = this.accommodations.find(a => a.id === id);
    this.accommodationSelected = found ?? null;
  }

}
