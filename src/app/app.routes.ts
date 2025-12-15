import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { ContactComponent } from './components/system/contact/contact.component';
import { AdminpanelComponent } from './components/admin/adminpanel/adminpanel.component';
import { AccommodationComponent } from './components/accommodation/accommodation/accommodation.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'adminpanel', component:AdminpanelComponent},
    {path: 'accommodations', component:AccommodationComponent},

    
    //Kivételes routeok

    {path: '', redirectTo: "/login", pathMatch: 'full'},

    {path: '**', component:NotfoundComponent}
 
];
