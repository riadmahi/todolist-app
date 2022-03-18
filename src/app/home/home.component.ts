import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: User;
  
  constructor(public auth: AuthService) { 
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log("user: "+ this.user.email);
  }

  ngOnInit(): void {
  }

}
