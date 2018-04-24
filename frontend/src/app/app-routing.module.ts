import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthProtect } from './auth/auth-protect.service';
import { OauthCallbackComponent } from './auth/oauth-callback-component/oauth-callback-component.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthProtect] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthProtect] },
  { path: 'login', component: LoginComponent, canActivate: [AuthProtect] },
  { path: 'todos', loadChildren: './todos/todos.module#TodosModule' },
  { path: 'oauth_callback', component: OauthCallbackComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthProtect]
})
export class AppRoutingModule { }
