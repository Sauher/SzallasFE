import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { NavbarComponent } from './components/system/navbar/navbar.component';
import { MessageComponent } from './components/system/message/message.component';
import { FooterComponent } from './components/system/footer/footer.component';
import { HeaderComponent } from './components/system/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MessageComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  app_title = 'Szállás foglaló';
  app_authors = 'Schauer Olivér, Czakó Csongor - 2025';
  about = 'Ez egy szállás foglaló alkalmazás, ahol különböző szálláshelyek közül választhatsz és foglalhatsz le szobákat egyszerűen és gyorsan. Regisztrálj, jelentkezz be, és kezdj el felfedezni a legjobb ajánlatokat!';
  address = '6500 Baja, Bácska tér 1.';
  app_email = 'szallasfogalo&#64;example.com';


}
