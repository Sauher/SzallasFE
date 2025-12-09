import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';

interface User {
  name: string;
  email: string;
  password: string;
  confirm: string;
  role: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: '',
  }

  rememberMe: boolean = false;

  constructor(
    private api: APIService,
    private auth: AuthService,
    private message: MessageService,
    private router: Router
  ) {}

  login() {
    this.api.Login('users', this.user).then(res => {
      if (res.status == 500) {
        this.message.show('danger', 'Hiba', "Hiba van a rendszerben")
        return
      }
      if (this.rememberMe) {
        this.auth.storeUser(JSON.stringify(res.data))
      }

      this.auth.login(JSON.stringify(res.data));
      this.router.navigate(['/szallasok']);
      this.message.show('success', 'Siker', res.message);
    })
  }
}
