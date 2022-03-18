import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import {User} from '../shared/services/user'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  signUp(name: string, email: string, password: string){
    this.auth.SignUp(email, password, name);

  }

}
