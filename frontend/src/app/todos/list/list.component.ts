import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
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

  constructor(private todosService: TodosService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.todosService.fetchLists();

    this.subscription = this.store.select('list')
      .subscribe(
        (state) => {
          this.lists = state.lists;
        }
      );
  }

  selectList(list: List) {
    // const id = list.id;
    this.todosService.selectList(list)
    // this.todosService.fetchTasks(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
