import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../store/auth.reducer';
import { AuthService } from '../auth.service';


@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() page: string;
  authState: Observable<fromAuth.State>;

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
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

}