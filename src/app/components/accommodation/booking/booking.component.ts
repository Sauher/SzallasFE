import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { APIService } from '../../../services/api.service';
import { Accommodation } from '../../../interfaces/accommodation';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';
declare var bootstrap: any;

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit, AfterViewInit {


  date: Date = new Date();

  @Input() accommodationSelected: Accommodation | null = null;
  selectedAccommodationId: number | null = null;
  private idFromQuery: number | null = null;
  minStartDate: string = '';
  @ViewChild('bookingSummaryModal', { static: false }) bookingSummaryModalEl!: ElementRef;
  modal: any = null;


  userdata: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: ''
  }
  
  accommodation: string = '';
  name: string = '';
  phone: string = '';
  dateOfStart: Date = new Date();
  duration: number = 1;
  bookedAccommodation: Accommodation | null = null;


  leaveDate: Date = new Date();
  pricePerNight: any;

  // bookingData will be (re)built from current form values before use
  bookingData = {
    //id	userId	accommodationId	startDate	endDate	persons	total,status
    id: 0,
    userId: 0,
    reservation_name: '',
    phone: '',
    accommodationId: 0,
    startDate: new Date(),
    endDate: new Date(),
    persons: 0,
    totalPrice: 0,
    status: 'pending',
  };

  private buildBookingData() {
    // compute leave date from start + duration
    this.leaveDate = new Date(this.dateOfStart);
    this.leaveDate.setDate(this.leaveDate.getDate() + (this.duration || 0));

    this.bookingData = {
      id: 0,
      userId: this.userdata.id!,
      reservation_name: this.name || '',
      phone: this.phone || '',
      accommodationId: this.selectedAccommodationId || 0,
      startDate: this.dateOfStart,
      endDate: this.leaveDate,
      persons: 1,
      totalPrice: this.calculateTotalPrice(),
      status: 'pending',
    };
  }


  constructor(
    private apiService: APIService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.userdata = this.authService.loggedUser()[0];

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

  ngAfterViewInit(): void {
    // initialize bootstrap modal after view is ready
    try {
      if (typeof bootstrap !== 'undefined' && this.bookingSummaryModalEl && this.bookingSummaryModalEl.nativeElement) {
        this.modal = new bootstrap.Modal(this.bookingSummaryModalEl.nativeElement);
      }
    } catch (e) {
      console.warn('Booking modal initialization failed', e);
      this.modal = null;
    }
  }

  accommodations: Accommodation[] = [];

  getBookingDetails() {
    this.apiService.SelectAll('accommodations').then(res => {
      this.accommodations = res.data;
      this.trySetSelected();
    }).catch(error => {
      this.messageService.show('warning', 'Hiba az adatok lekérésekor: ' + error.message, 'error');
    });
  }

  getUserId(){
    return ;
  }

  private trySetSelected() {
    if (!this.idFromQuery) return;
    if (this.accommodations.length === 0) return;
    const found = this.accommodations.find(a => a.id === this.idFromQuery);
    if (found) {
  this.accommodationSelected = found;
  this.selectedAccommodationId = found.id;
  this.bookedAccommodation = found;
  this.pricePerNight = found.basePrice;
    }
  }

  onAccommodationChange(id: number | null) {
    if (id == null) { this.accommodationSelected = null; return; }
    const found = this.accommodations.find(a => a.id === id);
    this.accommodationSelected = found ?? null;
    this.bookedAccommodation = found ?? null;
    this.pricePerNight = found ? found.basePrice : 0;
  }

  calculateTotalPrice(): number {
    const price = Number(this.pricePerNight) || 0;
    return price * (this.duration || 0);
  }

  openBookingSummaryModal() {
  this.buildBookingData();
    if (this.modal && typeof this.modal.show === 'function') {
      this.modal.show();
    } else {
      console.warn('Booking modal not available to show');
    }
  }

  confirmBooking() {
  this.buildBookingData();
  this.apiService.Insert('bookings', this.bookingData).then(res => {
      this.messageService.show('success', 'Foglalás sikeresen megerősítve!', 'success');
    }).catch(error => {
      this.messageService.show('danger', 'Hiba a foglalás megerősítésekor: ' + error.message, 'error');
    });
    if (this.modal && typeof this.modal.hide === 'function') {
      this.modal.hide();
    } else {
      console.warn('Booking modal not available to hide');
    }



    // Handle form submission
    console.log('Booking Data:', this.bookingData);
  }

}
