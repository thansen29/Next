import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { TodosService } from './todos.service';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosHomeComponent } from './todos-home/todos-home.component';

@NgModule({
  declarations: [
    TodosHomeComponent,
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [TodosService]
})
export class TodosModule { }
