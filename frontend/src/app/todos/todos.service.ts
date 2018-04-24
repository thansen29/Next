import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../store/app.reducer';
import { Angular2TokenService } from 'angular2-token';
import * as listActions from './store/list/list.actions';

@Injectable()
export class TodosService {

  constructor(private store: Store<AppState>,
              private tokenService: Angular2TokenService) { }

  fetchLists() {
    // this.httpClient.get('http://localhost:3000/api/lists')
    this.tokenService.get('api/lists')
      .subscribe(
        (lists) => {
          this.store.dispatch(new listActions.ReceiveLists(lists.json()))
          // debugger
        },
        (error) => {
          // debugger
        }
      )
  }

}
