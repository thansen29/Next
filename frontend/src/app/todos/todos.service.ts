import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../store/app.reducer';
import { Angular2TokenService } from 'angular2-token';
import * as _ from 'lodash';
import * as ListActions from './store/list/list.actions';
import * as TaskActions from './store/task/task.actions';
import { List } from '../shared/list.model';
import { Task } from '../shared/task.model';

@Injectable()
export class TodosService {

  constructor(private store: Store<AppState>,
              private tokenService: Angular2TokenService) { }


  fetchLists() {
    this.tokenService.get('api/lists')
      .subscribe(
        (lists) => {
          this.store.dispatch(new ListActions.ReceiveLists(lists.json()))
        },
        (error) => {
        }
      )
  }

  fetchList(listId: number) {
    this.tokenService.get(`api/lists/${listId}`)
      .subscribe(
        (list) => {
          this.store.dispatch(new ListActions.SelectList(list.json()))
        }
      )
  }

  selectList(list: List) {
    this.store.dispatch(new ListActions.SelectList(list))
    this.store.dispatch(new TaskActions.ClearTasks());
    this.fetchTasks(list.id);
  }

  fetchTasks(id: number) {
    this.tokenService.get(`api/tasks/lists/${id}`)
      .subscribe(
        (tasks) => {
          this.store.dispatch(new TaskActions.ReceiveTasks(tasks.json()))
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
