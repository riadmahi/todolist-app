import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoList } from '../shared/services/todolist.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  private routeSub: Subscription;
  public todoList!: TodoList; 
  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      console.log("Check 1");
      this.todoList = JSON.parse(localStorage.getItem(params['id'])!)
      console.log(this.todoList);
      
    })
    
   }

  ngOnInit(): void {
    
  }

}
