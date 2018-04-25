import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { TodosService } from '../todos.service';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks;
  constructor(private store: Store<AppState>,
              private todosService: TodosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.todosService.fetchTasks(id);

    this.store.select('task')
      .subscribe(
        (state) => {
          if (state.tasks instanceof Object) {
            this.tasks = _.values(state.tasks);
          }
        }
      );
  }

}
