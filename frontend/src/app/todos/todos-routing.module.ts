import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosHomeComponent } from './todos-home.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskViewComponent } from './tasks/task-view/task-view.component';

import { AuthGuard } from '../auth/auth-guard.service';

const todoRoutes: Routes = [
  { path: '', component: TodosHomeComponent, canActivate: [AuthGuard], children: [
    { path: ':id', component: TasksComponent, children: [
      { path: 'tasks/:id', component: TaskViewComponent, pathMatch: 'full' },
    ] },
    
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(todoRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TodosRoutingModule { }
