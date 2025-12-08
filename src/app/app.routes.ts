import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},

    
    //Kivételes routeok

    {path: '', redirectTo: "/login", pathMatch: 'full'},

    {path: '**', component:NotfoundComponent}
 
];
