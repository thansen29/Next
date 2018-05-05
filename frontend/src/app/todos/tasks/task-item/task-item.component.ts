import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
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
  @Input() task: Task;
  @Input() tab;
  selectedId: number;
  checked: boolean;
  subscription: Subscription;
  hovered: boolean = false;

  @Output() checkedTask = new EventEmitter<number>();
  @Output() clearCheckedTasks = new EventEmitter();

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

  handleCheck(event) {
    event.stopPropagation();
    this.checkedTask.emit(this.task.id);
  }

  selectTask(task: Task) {
    this.todosService.selectTask(task);
    this.clearCheckedTasks.emit();
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
