import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { TodosService } from '../todos.service';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  lists;
  constructor(private todosService: TodosService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.todosService.fetchLists();

    this.store.select('list')
      .subscribe(
        (state) => {
          if (state.lists instanceof Object) {
            this.lists = _.values(state.lists)
          }
        }
      );
  }

  selectList(list) {
    const id = list.id;
    this.todosService.fetchTasks(id);
  }

}
