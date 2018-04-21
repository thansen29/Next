import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosHomeComponent } from './todos-home/todos-home.component';

const todoRoutes: Routes = [
  { path: '', component: TodosHomeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(todoRoutes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
