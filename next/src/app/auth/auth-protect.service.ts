import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthProtect implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {}

  canActivate() {
    return true;

    // console.log(this.authService.isSignedIn());
    // return this.authService.isSignedIn();
    // return true;
    // this.authService.isSignedIn()
    //   .subscribe(
    //     (response) => {
    //       console.log(response, 'protec');
    //       if (response) {
    //         this.router.navigate(['/lists']);
    //         return false;
    //       } else {
    //         return true;
    //       }
    //     }
    //   )



    // if (localStorage.getItem('token')) {
    //   this.router.navigate(['/lists']);
    //   return false;
    // } else {
    //   return true;
    // }
  }
}

