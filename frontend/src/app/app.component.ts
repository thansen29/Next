import { Component } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works';

  constructor(private authToken: Angular2TokenService) {
    this.authToken.init(environment.token_auth_config);

    // this.authToken.signIn({
    //   email: 'tom@test.com',
    //   password: 'password'
    // })
    //   .subscribe(
    //     (res) => {
    //       console.log('auth response: ', res);
    //       console.log('auth response headers: ', res.headers.toJSON());
    //       console.log('auth response body: ', res.json());
    //       console.log('Signed in? ', this.authToken.userSignedIn());
    //
    //     },
    //     (err) => {
    //       console.log('auth error', err)
    //     }
    //   );
  }
}
