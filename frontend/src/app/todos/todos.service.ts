import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../store/app.reducer';
import { Angular2TokenService } from 'angular2-token';
import * as listActions from './store/list/list.actions';
import * as taskActions from './store/task/task.actions';

// TODO: these fetch functions should really pass through an array of 
// list items and an array of task items - effects?
@Injectable()
export class TodosService {

  constructor(private store: Store<AppState>,
              private tokenService: Angular2TokenService) { }

  fetchLists() {
    this.tokenService.get('api/lists')
      .subscribe(
        (lists) => {
          this.store.dispatch(new listActions.ReceiveLists(lists.json()))
        },
        (error) => {
        }
      )
  }

  fetchTasks(id: number) {
    this.tokenService.get(`api/tasks/lists/${id}`)
      .subscribe(
        (tasks) => {
          this.store.dispatch(new taskActions.ReceiveTasks(tasks.json()))
        }
      )
  }

}
