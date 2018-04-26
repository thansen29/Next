import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../store/app.reducer';
import { Angular2TokenService } from 'angular2-token';
import * as _ from 'lodash';
import * as listActions from './store/list/list.actions';
import * as taskActions from './store/task/task.actions';
import { List } from '../shared/list.model';
import { Task } from '../shared/task.model';

// list items and an array of task items - effects?
@Injectable()
export class TodosService {

  constructor(private store: Store<AppState>,
              private tokenService: Angular2TokenService) { }

  fetchLists() {
    const newLists: List[] = [];
    this.tokenService.get('api/lists')
      .subscribe(
        (lists) => {
          _.map(lists.json(), list => {
            newLists.push(new List(list.id, list.title, list.tasks));
          })
          this.store.dispatch(new listActions.ReceiveLists(newLists))
        },
        (error) => {
        }
      )
  }

  fetchTasks(id: number) {
    const newTasks: Task[] = [];
    this.tokenService.get(`api/tasks/lists/${id}`)
      .subscribe(
        (tasks) => {
          _.map(tasks.json(), task => {
            newTasks.push(new Task(task.id, task.title, task.description, task.created_at, task.completed));
          })
          this.store.dispatch(new taskActions.ReceiveTasks(newTasks))
        }
      )
  }

  clearTasks() {
    this.store.dispatch(new taskActions.ClearTasks())
  }

}
