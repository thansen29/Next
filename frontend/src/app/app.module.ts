import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { AuthService } from './auth/auth.service';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AuthFormComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [Angular2TokenService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
