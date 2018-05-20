import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthProtect } from './auth/auth-protect.service';

// { path: '', component: HomeComponent, canActivate: [AuthProtect] },
// { path: 'signup', component: SignupComponent, canActivate: [AuthProtect] },
// { path: 'login', component: LoginComponent, canActivate: [AuthProtect] },
// { path: 'lists', loadChildren: './todos/todos.module#TodosModule' },
// { path: '**', redirectTo: '' },

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lists', loadChildren: './todos/todos.module#TodosModule' },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthProtect]
})
export class AppRoutingModule { }
