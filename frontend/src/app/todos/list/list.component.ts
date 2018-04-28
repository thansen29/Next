import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { TodosService } from '../todos.service';
import { AppState } from '../../store/app.reducer';
import { List } from '../../shared/list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  lists: List[];
  subscription: Subscription
  selectedId: number;

  constructor(private todosService: TodosService,
              private store: Store<AppState>,
              private router: Router) { }


  ngOnInit() {
    this.todosService.fetchLists();
      
    //remember list selection on page refresh
    const url = this.router.url.split('/');
    let id;
    if (!isNaN(+url[url.length - 1])) {
      id = +url[url.length - 1];
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
  }
  
  selectList(list: List) {
    this.todosService.selectList(list)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
