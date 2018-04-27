import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { AppState } from '../../../store/app.reducer';
import { TodosService } from '../../todos.service';
import { Task } from '../../../shared/task.model';
import { Subscription } from 'rxjs/Subscription';
import * as TaskActions from '../../store/task/task.actions';


@Component({
  selector: 'task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnDestroy {
  task: Task;
  listName: string;
  taskCount: number;
  completedCount: number;

  subscription: Subscription;

  constructor(private store: Store<AppState>,
              private todosService: TodosService) { }

  // need to fetch list title on page refresh
  ngOnInit() {
    this.subscription = this.store.select('task')
      .subscribe(
        (state) => {
          this.task = state.selectedTask;
          this.taskCount = _.size(state.tasks);
          this.completedCount = _.filter(state.tasks, ['completed', true]).length;
        }
      )

    this.store.select('list')
      .subscribe(
        (state) => {
          if (state.selectedList) {
            this.listName = state.selectedList.title;
          }
        }
      )  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new TaskActions.ClearSelected());
  }

}
