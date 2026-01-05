import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { APIService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { User } from '../../../interfaces/user';
import { ApiResponse } from '../../../interfaces/apiresponse';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    phone: '',
    address: '',
    role: '',
  }

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  
  loadingProfile: boolean = false;
  loadingPassword: boolean = false;

  constructor(
    private api: APIService,
    private auth: AuthService,
    private message: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    const userData = this.auth.loggedUser();
    if (userData && userData[0]) {
      this.user = userData[0];
      console.log(this.user);
    }
  }

  updateProfile() {
    if (!this.user.name || !this.user.email) {
      this.message.show('warning', 'Figyelmeztetés', 'A név és email mező kitöltése kötelező!');
      return;
    }

    this.loadingProfile = true;

    const updateData: any = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address
    };

    this.api.Update('users', this.user.id || 0, updateData).then((res: ApiResponse) => {
      this.loadingProfile = false;
      
      if (res.status == 500) {
        this.message.show('danger', 'Hiba', res.message || 'Hiba történt az adatok frissítéskor');
        return;
      }

      this.auth.storeUser(JSON.stringify([res.data]));
      this.message.show('success', 'Siker', res.message || 'A profil sikeresen frissítve!');
    });
  }

  updatePassword() {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.message.show('warning', 'Figyelmeztetés', 'Minden jelszó mező kitöltése kötelező!');
      return;
    }

    if (!this.validatePasswordMatch()) {
      this.message.show('warning', 'Figyelmeztetés', 'Az új jelszavak nem egyeznek!');
      return;
    }

    if (this.oldPassword === this.newPassword) {
      this.message.show('warning', 'Figyelmeztetés', 'Az új jelszó nem lehet azonos a régivel!');
      return;
    }

    this.loadingPassword = true;

    const updateData: any = {
      oldPassword: this.oldPassword,
      password: this.newPassword
    };

    this.api.Update('users', this.user.id || 0, updateData).then((res: ApiResponse) => {
      this.loadingPassword = false;
      
      if (res.status == 500) {
        this.message.show('danger', 'Hiba', res.message || 'Hiba történt a jelszó frissítéskor');
        return;
      }

      this.message.show('success', 'Siker', res.message || 'A jelszó sikeresen frissítve!');

      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    });
  }

  validatePasswordMatch(): boolean {
    if (this.newPassword && this.confirmPassword) {
      return this.newPassword === this.confirmPassword;
    }
    return true;
  }
}
