import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { TodosService } from '../todos.service';
import { AppState } from '../../store/app.reducer';
import { List } from '../../shared/list.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  lists: List[];
  subscription: Subscription

  constructor(private todosService: TodosService,
              private store: Store<AppState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.todosService.fetchLists();
    // debugger
    // this.todosService.setSelectedList(id)

    this.subscription = this.store.select('list')
      .subscribe(
        (state) => {
          this.lists = state.lists;
        }
      );
  }

  selectList(list: List) {
    this.todosService.selectList(list)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
