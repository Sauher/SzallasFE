import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},

    
    //Kivételes routeok

    {path: '', redirectTo: "/login", pathMatch: 'full'},

    {path: '**', component:NotfoundComponent}
 
];
