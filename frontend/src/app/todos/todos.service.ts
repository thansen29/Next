import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { AppState } from '../store/app.reducer';
import * as ListActions from './store/list/list.actions';
import * as TaskActions from './store/task/task.actions';
import { List } from '../shared/list.model';
import { Task } from '../shared/task.model';

@Injectable()
export class TodosService {

  constructor(private store: Store<AppState>,
              private httpClient: HttpClient) { }


  fetchLists() {
    this.httpClient.get('api/lists')
      .subscribe(
        (lists) => {
          this.store.dispatch(new ListActions.ReceiveLists(lists))
        },
        (error) => {
          debugger
        }
      )
  }

  fetchList(listId: number) {
    this.httpClient.get(`api/lists/${listId}`)
      .subscribe(
        (list) => {
          this.store.dispatch(new ListActions.SelectList(list))
        },
        (error) => {
          debugger
        }
      )
  }

  selectList(list: List) {
    this.store.dispatch(new ListActions.SelectList(list))
    this.store.dispatch(new TaskActions.ClearTasks());
    this.fetchTasks(list.id);
  }

  fetchTasks(id: number) {
    this.httpClient.get(`api/tasks/lists/${id}`)    
      .subscribe(
        (tasks) => {
          this.store.dispatch(new TaskActions.ReceiveTasks(tasks))
        }
      )
  }

  selectTask(task: Task) {
    this.store.dispatch(new TaskActions.SelectTask(task));
  }

  clearEverything() {
    this.store.dispatch(new TaskActions.ClearTasks())
    this.store.dispatch(new TaskActions.ClearSelected());   
    this.store.dispatch(new ListActions.ClearSelected());    
  }

}
