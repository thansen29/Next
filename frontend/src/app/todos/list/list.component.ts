import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { TodosService } from '../todos.service';
import { AppState } from '../../store/app.reducer';
import { List } from '../../shared/list.model';
import { Router, Event, NavigationStart } from '@angular/router';

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
              private router: Router) { }

  ngOnInit() {
    this.todosService.fetchLists();
    
    this.subscription = this.store.select('list')
      .subscribe(
        (state) => {
          this.lists = state.lists;
        }
      )
    
      // let url = this.router.url.split('/');
      // const id = +url[url.length-1];
      // if (id) {
      //   let selectedList = _.find(state.lists, ['id', id]);
      //   if (selectedList) {
      //     this.todosService.selectList(selectedList);
      //   }
      // }
      // this.router.events
      //   .subscribe(
      //     (event: Event) => {
      //       if (event instanceof NavigationStart) {
      //         debugger
      //       }
      //     }
      //   )
  }

  selectList(list: List) {
    this.todosService.selectList(list)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
