import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { TodoList } from './todolist.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public afs: AngularFirestore) { 
  }

  CreateTodoList(){
    let id = this.afs.createId();

    const taskRef: AngularFirestoreDocument<TodoList> = this.afs.doc(
      `tasks/${id}`
    );

    const photoUrl = "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG9kb2xpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    const todoListData : TodoList = {id: id, label: "Nouvelle tache", photo: photoUrl, items: [] };
    taskRef.set(todoListData, {
      merge: true,
    });
    
    localStorage.setItem(id, JSON.stringify(todoListData));
  }
}
