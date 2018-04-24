import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/auth.service';
import * as authActions from '../../auth/store/auth.actions';
import { State as AuthState } from '../../auth/store/auth.reducer';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(private authService: AuthService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
    const loggedIn = this.authService.isSignedIn();
    if (loggedIn) {
      this.store.dispatch(new authActions.Signin());
    }
  }

  signoutUser() {
    this.authService.signoutUser()
  }

}
