import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() page: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  authUser() {
    this.page === "Sign up" ? this.authService.signupUser() : this.authService.logInUser()
    // if (this.page === "Sign up") {
    //   this.authService.signupUser();
    // } else {
    //   this.authService.logInUser();
    // }
  }

}
