import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosHomeComponent } from './todos-home/todos-home.component';
import { AuthGuard } from '../auth/auth-guard.service';

const todoRoutes: Routes = [
  { path: '', component: TodosHomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(todoRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TodosRoutingModule { }
