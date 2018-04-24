import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-oauth-callback-component',
  templateUrl: './oauth-callback-component.html',
  styleUrls: ['./oauth-callback-component.scss']
})
export class OauthCallbackComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  //   debugger
  //   this.authService.processOAuthCallback();
  }

}
