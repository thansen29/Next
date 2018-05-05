import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { AppState } from '../../../store/app.reducer';
import { TodosService } from '../../todos.service';
import { Task } from '../../../shared/task.model';
import * as TaskActions from '../../store/task/task.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  animations: [
    trigger('taskView', [
      state('in', style({
        'opacity': 1,
        transform: 'translateX(0)'
      })),
      transition(':enter', [
        style({
          'opacity': 0,
          transform: 'translateX(100%)'
        }),
        animate(500)
      ]),
      transition(':leave', [
        style({
          'opacity': 0,
          transform: 'translateX(-100%)'
        }),
        animate(500)
      ]),
    ]),
  ]
})
export class TaskViewComponent implements OnInit, OnDestroy {
  task: Task;
  subscription: Subscription;
  
  constructor(private store: Store<AppState>,
              private todosService: TodosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.todosService.fetchTask(id);

    this.subscription = this.store.select('task')
      .subscribe(
        (state) => {
          this.task = state.selectedTask;
        }
      )
  }

  updateTask() {
    this.todosService.updateTask(this.task.id, this.task.title, this.task.description);
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new TaskActions.ClearSelected());
  }

}
