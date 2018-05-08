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
    this.httpClient.get('api/lists')
      .subscribe(
        (lists) => {
          this.store.dispatch(new ListActions.ReceiveLists(lists))
        },
        (error) => {
          console.log("FETCH LISTS ERROR");
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
          console.log("FETCH LIST ERROR");          
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
          console.log("CREATE LIST ERROR");
          
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
          console.log("EDIT LIST ERROR");
          
        }
      )
  }

  selectList(list: List) {
    this.store.dispatch(new ListActions.SelectList(list))
    this.store.dispatch(new TaskActions.ClearTasks());
    this.fetchTasks(list.id);
  }

  deleteList(id: number) {
    this.httpClient.delete(`api/lists/${id}`)
      .subscribe(
        (response) => {
          this.store.dispatch(new ListActions.DeleteList(id));
        },
        (error) => {
          console.log("DELETE LIST ERROR");
          
        }
      );
  }

  getAllTasks() {
    this.httpClient.get(`api/tasks/all`)
      .subscribe(
        (tasks) => {
          this.store.dispatch(new TaskActions.ReceiveAllTasks(tasks));
        }, 
        (error) => {
          console.log("GET ALL TASKS ERROR");
          
        }
      );
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
          console.log("FETCH LISTS ERROR");
            
        }
      )
  }

  deleteTasks(ids: number[]) {
    _.forEach(ids, id => {
      this.httpClient.delete(`api/tasks/${id}`)
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
      this.httpClient.patch(`api/tasks/${id}`, {})
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
    this.httpClient.patch(`api/tasks/${id}`, { title, description })
      .subscribe(
        (task) => {
          const newTask = new Task(task['id'], task['title'], task['description'], task['created_at'], task['completed'], task['updated_at'])
          this.store.dispatch(new TaskActions.UpdateTask(newTask));
        }, 
        (error) => {
          console.log("UPDATE TASKS ERROR");
          
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
