import { Component } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

  constructor(
    private apiService: APIService,
    private messageService: MessageService
  ) { }

  guests: number[] = []

  //get guests data
  getGuestsData() {
    this.apiService.SelectAll('bookings').then(res => {
      this.guests = res.data.map((item: { capacity: any; }) => item.capacity);
    });
  }

}
