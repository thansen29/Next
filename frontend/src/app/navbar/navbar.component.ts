import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import * as authActions from '../auth/store/auth.actions';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(new authActions.Signin());
    }
  }

  signoutUser() {
    this.authService.signoutUser()
  }

}
