import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  {
    path:"sign-in",
    component: SignInComponent
  },
  {
    path:"",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"sign-up",
    component: SignUpComponent
  },
  {
    path:"todolist/:id",
    component: TodoComponent,
    
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
