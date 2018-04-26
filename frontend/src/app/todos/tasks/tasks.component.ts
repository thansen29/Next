import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { TodosService } from '../todos.service';
import { AppState } from '../../store/app.reducer';
import { Task } from '../../shared/task.model';

@Component({
  selector: 'tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  subscription: Subscription;

  constructor(private store: Store<AppState>,
              private todosService: TodosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.todosService.fetchTasks(id);

    this.subscription = this.store.select('task')
      .subscribe(
        (state) => {
          this.tasks = state.tasks;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.todosService.clearTasks();
  }

}
