import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, Event, NavigationStart } from '@angular/router';
import * as Typed from 'typed.js';

import { AppState } from '../../store/app.reducer'
import { State as AuthState } from '../store/auth.reducer';
import * as authActions from '../store/auth.actions';
import { AuthService } from '../auth.service';


@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() page: string;
  authState: Observable<AuthState>;

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.router.events
      .subscribe(
        (event: Event) => {
          if (event instanceof NavigationStart) {
            this.store.dispatch(new authActions.ClearErrors());
          }
        }
      )
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if (this.page === "Sign up") {
      this.authService.signupUser(email, password);
    } else {
      this.authService.logInUser(email, password);
    }
  }

  demoLogin(form: NgForm) {
    form.reset();
    const email = {
      strings: ["demouser@next.com"],
      typeSpeed: 50
    }

    const password = {
      strings: ["password"],
      typeSpeed: 40
    }

    new Typed('.email', email);
    new Typed('.password', password);

    setTimeout(() => {
      this.authService.logInUser('demouser@next.com', 'password');
    }, 1400)
  }

  isValid(emailInput) {
    debugger
  }

}
