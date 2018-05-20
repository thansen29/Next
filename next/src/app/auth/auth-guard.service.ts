import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {}

  canActivate() {
    return false;
    // this.authService.isSignedIn()
    //   .subscribe(
    //     (res) => {
    //       if (res) {
    //         return true;
    //       } else {
    //           this.router.navigate(['/login']);
    //           return false;
    //       }
    //     }
    //   )

    // console.log(this.authService.isSignedIn());
    // this.authService.isSignedIn()
      // .subscribe(
      //   (response) => {
      //     console.log(response);
      //     if (response) {
      //       return true;
      //     } else {
      //       this.router.navigate(['/login']);
      //       return false;
      //     }
      //   }
      // )
    // return true;

    // return this.authService.isSignedIn();
      // .subscribe(
      //   (response) => {
      //     console.log(response, 'guard');
          
      //     if (response) {
      //       return true;
      //     } else {
      //       this.router.navigate(['/login']);
      //       return false;
      //     }
      //   }
      // )

    // if (localStorage.getItem('token')) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }


  }
}
