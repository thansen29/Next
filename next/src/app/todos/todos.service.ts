import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

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
    console.log('HELLO');
    this.httpClient.get('http://localhost:3000/api/lists')
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
    this.httpClient.get(`http://localhost:3000/api/lists/${listId}`)
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
    this.httpClient.post('http://localhost:3000/api/lists', { title })
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
    this.httpClient.patch(`http://localhost:3000/api/lists/${id}`, { title })
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

  deleteList(id: number) {
    this.httpClient.delete(`http://localhost:3000/api/lists/${id}`)
      .subscribe(
        (response) => {
          this.store.dispatch(new ListActions.DeleteList(id));
        },
        (error) => {
          debugger
        }
      );
  }

  getAllTasks() {
    this.httpClient.get(`http://localhost:3000/api/tasks/all`)
      .subscribe(
        (tasks) => {
          this.store.dispatch(new TaskActions.ReceiveAllTasks(tasks));
        }, 
        (error) => {
          debugger
        }
      );
  }

  fetchTasks(id: number) {
    this.httpClient.get(`http://localhost:3000/api/tasks/lists/${id}`)    
      .subscribe(
        (tasks) => {
          this.store.dispatch(new TaskActions.ReceiveTasks(tasks))
        }
      )
  }

  fetchTask(id: number) {
    this.httpClient.get(`http://localhost:3000/api/tasks/${id}`)
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
    this.httpClient.post('http://localhost:3000/api/tasks', { task: { title, description, list_id: listId } })
      .subscribe(
        (task) => {
          this.store.dispatch(new TaskActions.ReceiveTask(task));
        },
        (error) => {
          debugger
        }
      )
  }

  deleteTasks(ids: number[]) {
    _.forEach(ids, id => {
      this.httpClient.delete(`http://localhost:3000/api/tasks/${id}`)
        .subscribe(
          (response) => {
          },
          (error) => {
          }
        )
    });
    this.store.dispatch(new TaskActions.DeleteTasks(ids));
  }

  completeTasks(ids: number[]) {
    _.forEach(ids, id => {
      this.httpClient.patch(`http://localhost:3000/api/tasks/${id}`, {})
        .subscribe(
          (response) => {
          },
          (error) => {
            console.log(error);
            
          }
        )
    });
    this.store.dispatch(new TaskActions.UpdateTasks(ids));
  }

  updateTask(id: number, title: string, description: string) {
    this.httpClient.patch(`http://localhost:3000/api/tasks/${id}`, { title, description })
      .subscribe(
        (task) => {
          const newTask = new Task(task['id'], task['title'], task['description'], task['created_at'], task['completed'], task['updated_at'])
          this.store.dispatch(new TaskActions.UpdateTask(newTask));
        }, 
        (error) => {
          debugger
        }
      );
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
