import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean;

  constructor(private authToken: Angular2TokenService) { }

  ngOnInit() {
    this.loggedIn = this.authToken.userSignedIn() ?  true : false;
  }

}
