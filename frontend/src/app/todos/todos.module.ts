import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosHomeComponent } from './todos-home/todos-home.component';

@NgModule({
  declarations: [
    TodosHomeComponent,
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class TodosModule { }
