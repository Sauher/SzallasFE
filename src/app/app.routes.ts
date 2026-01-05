import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { ContactComponent } from './components/system/contact/contact.component';
import { AdminpanelComponent } from './components/admin/adminpanel/adminpanel.component';
import { AccommodationComponent } from './components/accommodation/accommodation/accommodation.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ManageaccommodationsComponent } from './components/owner/manageaccomodations/manageaccommodations.component';
import { BookingComponent } from './components/accommodation/booking/booking.component';

export const routes: Routes = [
    // Felhasználói routeok
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'profile', component: ProfileComponent},
    // Owner routeok
    {path: 'manageaccommodations', component: ManageaccommodationsComponent},
    // Rendszer routeok
    {path: 'contact', component: ContactComponent},
    {path: 'adminpanel', component:AdminpanelComponent},
    {path: 'accommodations', component:AccommodationComponent},
    {path: 'booking', component:BookingComponent},

    
    //Kivételes routeok

    {path: '', redirectTo: "/login", pathMatch: 'full'},

    {path: '**', component:NotfoundComponent}
 
];
