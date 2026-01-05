import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { APIService } from '../../../services/api.service';
import { Accommodation } from '../../../interfaces/accommodation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit{
 constructor(
   private apiService: APIService,
   private messageService: MessageService
 ) { }

 ngOnInit(): void {
   this.getBookingDetails();
 }

 accommodations: Accommodation[] = [];

 getBookingDetails() {
   this.apiService.SelectAll('accommodations').then(res => {
     this.accommodations = res.data;
   }).catch(error => {
     this.messageService.show('warning', 'Error fetching booking details: ' + error.message, 'error');
   });
 }

}
