import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';

import { reducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    AuthFormComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [AuthService, Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }