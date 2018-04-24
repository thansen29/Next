import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../store/app.reducer';

@Injectable()
export class TodosService {

  constructor(private store: Store<AppState>,
              private httpClient: HttpClient,
              private tokenService: Angular2TokenService) { }

  fetchLists() {
    // this.httpClient.get('http://localhost:3000/api/lists')
    this.tokenService.get('api/lists')
      .subscribe(
        (list) => {
          debugger
        },
        (error) => {
          debugger
        }
      )
  }

}
