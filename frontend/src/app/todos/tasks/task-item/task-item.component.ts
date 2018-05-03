import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Task } from '../../../shared/task.model';
import { TodosService } from '../../todos.service';
import { AppState } from '../../../store/app.reducer';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @Input() task: Task
  selectedId: number;
  checked: boolean;
  subscription: Subscription;
  hovered: boolean = false;

  constructor(private todosService: TodosService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('task')
      .subscribe(
        (state) => {
          if (state.selectedTask) {
            this.selectedId = state.selectedTask.id;
          }
        }
      )
  }

  // will need to do more with this soon
  handleCheck(event) {
    event.stopPropagation();
    this.checked = !this.checked;
  }

  selectTask(task: Task) {
    this.todosService.selectTask(task);
  }

  hover() {
    this.hovered = true;
  }

  unhover() {
    this.hovered = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
