import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoryService } from '../shared/services/history.service';
import { TodoItem, TodoList, TodolistService } from '../shared/services/todolist.service';

type FctFilter = (item: TodoItem) => boolean;
interface TodoListPlus extends TodoList {
    remaining: number,
    filter: FctFilter,
    displayedItems: readonly TodoItem[],
    allIsDone: boolean,
};

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  @Input() todoList! : TodoList;
  public canUndo = false;
  public canRedo = false;

  readonly fAll: FctFilter = () => true;
  readonly fCompleted: FctFilter = (item) => item.isDone;
  readonly fActive: FctFilter = (item) => !item.isDone;
  private fCurrent = new BehaviorSubject<FctFilter>(this.fAll);
  readonly todoObs: Observable<TodoListPlus>;

  constructor(public toDoService: TodolistService,  public historyService: HistoryService) { 
    this.todoObs = combineLatest([toDoService.observable, this.fCurrent]).pipe(
      map( ([L, f]) => ({
        ...L,
        remaining: L.items.reduce( (acc, item) => item.isDone ? acc : acc++, 0),        
        filter: f,
        displayedItems: L.items.filter(f),
        allIsDone: !L.items.find( item => !item.isDone ),
      }) )
    );
    
    // toDoService.updateTodoList(this.todoList);

    this.todoObs.subscribe(obs =>{
      this.saveDataLocally(obs);
      obs.items.map(e =>console.log(e));      
      this.canRedo = this.historyService.checkIfICanRedo();
      this.canUndo = this.historyService.checkIfICanUndo();
    });
  }

  private saveDataLocally(todoList: TodoList): void{
    console.log("Sauvegarde locale de la todoList");
    localStorage.setItem(todoList.id, JSON.stringify(todoList));
    this.historyService.push(todoList);
  }
  
  onSubmit(task: HTMLInputElement) {
    console.log(task.value);
    //Ajout d'une nouvelle task
    this.toDoService.create(task.value);
    task.value = "";
  }

  updateItem(newItem: TodoItem, item: TodoItem ){
    this.toDoService.update(newItem, item); 
  }

  removeItem(task: TodoItem){
    this.toDoService.delete(task)
  }

  clickUndo(){
    let todo = this.historyService.undo();
    this.toDoService.updateTodoList(todo);
  }

  clickRedo(){
    let todo = this.historyService.redo();
    this.toDoService.updateTodoList(todo);
  }

  setFilter(f:FctFilter) {
    this.fCurrent.next(f);
  }
}
