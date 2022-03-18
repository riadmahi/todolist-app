import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { DatabaseService } from '../shared/services/database.service';
import { TodoList } from '../shared/services/todolist.service';
import { User } from '../shared/services/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: User;
  public todolists : TodoList[] = []
  
  constructor(public auth: AuthService, public db: DatabaseService) { 
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log("user: "+ this.user.email);
    for (let [key, value] of Object.entries(localStorage)) {
      if(key !== "user"){
        const todolist: TodoList = JSON.parse(localStorage.getItem(key)!);
        this.todolists.push(todolist)
      }
      console.log(`${key}: ${value}`);

  }
  }

  ngOnInit(): void {
  }

}
