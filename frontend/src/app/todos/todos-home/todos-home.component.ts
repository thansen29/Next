import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { TodosService } from '../todos.service';
// import { State as listState} from '../store/list/list.reducer';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'app-todos-home',
  templateUrl: './todos-home.component.html',
  styleUrls: ['./todos-home.component.scss']
})
export class TodosHomeComponent implements OnInit {
  // listState: Observable<any>;
  lists;
  constructor(private todosService: TodosService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.todosService.fetchLists();

    this.store.select('list')
      .subscribe(
        (state) => {
          if (state.lists instanceof Object) {
            this.lists = _.values(state.lists)
          }
        }
      )
  }

}
