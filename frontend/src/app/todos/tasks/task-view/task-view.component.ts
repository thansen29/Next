import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../store/app.reducer';
import { TodosService } from '../../todos.service';
import { Task } from '../../../shared/task.model';
import * as TaskActions from '../../store/task/task.actions';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnDestroy {
  // task: Task;
  task;
  listName: string;
  taskCount: number;
  completedCount: number;
  subscription: Subscription;
  routeSubscription: Subscription;  
  // listSub: Subscription;
  allTasks: Observable<any>;
  
  constructor(private store: Store<AppState>,
              private todosService: TodosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('hello this is task view');
    
    // const id = this.route.snapshot.params['id'];
    // this.allTasks = this.store.select('task');
    
    // this.routeSubscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.subscription = this.allTasks.subscribe(
    //       (state) => {
    //         this.task = state.tasks[+params['id']];
    //       }
    //     );
    //   }
    // );
    // this.subscription = this.store.select('task')
    //   .subscribe(
    //     (state) => {
    //       this.task = state.selectedTask;
    //       this.taskCount = _.size(state.tasks);
    //       this.completedCount = _.filter(state.tasks, ['completed', true]).length;
    //     }
    //   )

    // this.listSub = this.store.select('list')
    //   .subscribe(
    //     (state) => {
    //       if (state.selectedList) {
    //         this.listName = state.selectedList.title;
    //       }
    //     }
    //   )  
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    // this.listSub.unsubscribe();
    this.store.dispatch(new TaskActions.ClearSelected());
  }

}
