import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Router, Event } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { TodosService } from '../todos.service';
import { AppState } from '../../store/app.reducer';
import { List } from '../../shared/list.model';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  lists: List[];
  subscription: Subscription
  selectedId: number;
  modalState: any; 
  mode: string;
  first: number;

  constructor(private todosService: TodosService,
              private store: Store<AppState>,
              private router: Router) { }


  ngOnInit() {
    this.todosService.fetchLists();
    
    //remember list selection on page refresh
    const url = this.router.url.split('/');
    if (url.length > 2) {
      let id;
      id = +url[2];
      this.todosService.fetchList(id);
    }
    
    this.subscription = this.store.select('list')
      .subscribe(
        (state) => {
          this.lists = _.map(state.lists, list => {
            return new List(list.id, list.title, list.taskIds);
          })

          if (state.selectedList) {
            this.selectedId = state.selectedList.id;
          }
        }
      )

    this.modalState = this.store.select('modal');
  }
  
  selectList(list: List) {
    this.todosService.selectList(list)
  }

  createList() {
    this.mode = "Create";
    this.todosService.openModal();
  }

  editList() {
    this.mode = "Edit"
    this.todosService.openModal();
  }

  openModal() {
    this.todosService.openModal();
  }

  closeModal() {
    this.todosService.closeModal();
  }

  onSubmit(form: NgForm) {
    const title = form.value.title;
    if (this.mode === "Create") {
      this.todosService.createList(title);
    } else {
      this.todosService.editList(this.selectedId, title)
    }
    this.closeModal();
  }

  deleteList() {
    this.todosService.deleteList(this.selectedId);
    this.closeModal();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
