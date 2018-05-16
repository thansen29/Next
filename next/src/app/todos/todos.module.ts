import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { SharedModule } from '../shared/shared.module';
import { TodosService } from './todos.service';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosHomeComponent } from './todos-home.component';
import { ListComponent } from './list/list.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskItemComponent } from './tasks/task-item/task-item.component';
import { TaskViewComponent } from './tasks/task-view/task-view.component';


@NgModule({
  declarations: [
    TodosHomeComponent,
    ListComponent,
    TasksComponent,
    TaskItemComponent,
    TaskViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodosRoutingModule,
    HttpClientModule,
    FormsModule,
    MomentModule
  ],
  providers: [TodosService]
})
export class TodosModule { }
