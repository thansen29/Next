import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { TodosService } from './todos.service';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosHomeComponent } from './todos-home.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    TodosHomeComponent,
    ListComponent,
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
