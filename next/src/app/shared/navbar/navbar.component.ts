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
  viewable = false;

  constructor(private authService: AuthService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.authService.isSignedIn()
      .subscribe(
        (response) => {
          if (response) {
            this.store.dispatch(new authActions.Signin());
          }
        }
      )
  }

  signoutUser() {
    this.authService.signoutUser()
  }

  openMenu() {
    this.viewable = true;
  }

}
