import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { TodosService } from '../todos.service';
import { State as listState} from '../store/list/list.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todos-home',
  templateUrl: './todos-home.component.html',
  styleUrls: ['./todos-home.component.scss']
})
export class TodosHomeComponent implements OnInit {
  listState: Observable<listState>;

  constructor(private todosService: TodosService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.todosService.fetchLists();
    this.listState = this.store.select('list');
  }

  click() {
    console.log(this.listState);
  }

}
