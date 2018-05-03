import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
// import { Router } from '@angular/router';

import { AppState } from '../store/app.reducer';
import * as ListActions from './store/list/list.actions';
import * as TaskActions from './store/task/task.actions';
import * as ModalActions from '../shared/ui/modal/store/modal.actions';
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

  createList(title: string) {
    this.httpClient.post('api/lists', { title })
      .subscribe(
        (list) => {
          this.store.dispatch(new ListActions.ReceiveList(list));
        },
        (error) => {
          debugger
        }
      )
  }

  editList(id: number, title: string) {
    this.httpClient.patch(`api/lists/${id}`, { title })
      .subscribe(
        (list) => {
          this.store.dispatch(new ListActions.UpdateList(list));
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

  fetchTask(id: number) {
    this.httpClient.get(`api/tasks/${id}`)
      .subscribe(
        (task) => {
          const newTask = new Task(task['id'], task['title'], task['description'], task['created_at'], task['completed'], task['updated_at'])
          this.store.dispatch(new TaskActions.SelectTask(newTask));
        }
      )
  }

  selectTask(task: Task) {
    this.store.dispatch(new TaskActions.SelectTask(task));
  }

  createTask(title: string, description: string, listId: number) {
    this.httpClient.post('api/tasks', { task: { title, description, list_id: listId } })
      .subscribe(
        (task) => {
          this.store.dispatch(new TaskActions.ReceiveTask(task));
        },
        (error) => {
          debugger
        }
      )
  }

  clearEverything() {
    this.store.dispatch(new TaskActions.ClearTasks())
    this.store.dispatch(new TaskActions.ClearSelected());   
    this.store.dispatch(new ListActions.ClearSelected());    
  }

  openModal() {
    this.store.dispatch(new ModalActions.OpenModal());
  }

  closeModal() {
    this.store.dispatch(new ModalActions.CloseModal());
  }
}
