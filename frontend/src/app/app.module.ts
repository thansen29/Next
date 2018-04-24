import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';

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
import { OauthCallbackComponent } from './auth/oauth-callback-component/oauth-callback-component.component';

// import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
// import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";

// let config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("787448972798-f8id0ocip687bcmi26vuc5sjnfkm3f18.apps.googleusercontent.com")
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider("Facebook-App-Id")
//   }
// ]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    AuthFormComponent,
    OauthCallbackComponent
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
    A2tUiModule
  ],
  providers: [Angular2TokenService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// SocialLoginModule.initialize(config)