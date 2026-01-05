import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NavItem } from '../../../interfaces/navItem';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn = false;
  isAdmin = false;
  isOwner = false;
  loggedUserName = '';
  cartCount = 0
  constructor(
    private auth: AuthService,
  ){}

  navItems:NavItem[] = []

  ngOnInit():void{
    this.auth.isLoggedIn$.subscribe(res =>{
      this.isLoggedIn = res
      this.isAdmin = this.auth.isAdmin()
      this.isOwner = this.auth.isOwner()

      if(this.isLoggedIn){
        this.loggedUserName = this.auth.loggedUser()[0].name;
        this.setupMenu(true);
      }
      else{
        this.loggedUserName = ""
        this.setupMenu(false)
      }
      
    })
  }

  setupMenu(isLoggedIn:Boolean){
    this.navItems=[
      ...(isLoggedIn)?[
      {
        name: 'Szállás foglalás',
        url:'booking',
      },
      ...(this.isAdmin) ? [
        {
          name: 'Admin felület',
          url:'adminpanel'
        },
        {
          name: 'Statisztika',
          url:'stats'
        },
      ] : [], 
      ...(this.isOwner) ? [
        {
          name: 'Szállások kezelése',
          url:'manageaccommodations'
        },
      ] : [], 
      {
        name: 'Profil',
        url:'profile'
      },
      {
        name: 'Szállások',
        url:'accommodations'
      },
      {
        name: 'Kapcsolat',
        url:'contact'
      },
      {
        name: 'Kilépés',
        url:'logout'
      },
    ] : [
      {
        name: 'Belépés',
        url:'login'
      },
      {
        name: 'Regisztráció',
        url:'registration'
      },
      {
        name: 'Szállások',
        url:'accommodations'
      },
      {
        name: 'Kapcsolat',
        url:'contact'
      },
    ]
    ]
  }
}
