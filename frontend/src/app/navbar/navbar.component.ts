import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {
  loggedIn: boolean;

  //need subscription listening to changes in the store to actively update loggedIn status?
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    console.log(this.loggedIn);
  }

  ngOnChanges() {
    debugger
  }

  signoutUser() {
    this.authService.signoutUser()
  }

}
