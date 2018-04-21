import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { TodosRoutingModule } from '../todos/todos-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    NavbarComponent,
    HomeComponent
  ],
})
export class CoreModule {}
