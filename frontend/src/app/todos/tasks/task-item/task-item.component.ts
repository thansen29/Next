import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../../shared/task.model';
import { TodosService } from '../../todos.service';
import { AppState } from '../../../store/app.reducer';
import { Subscription } from 'rxjs/Subscription';

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
  handleCheck() {
    this.checked = !this.checked;
  }

  selectTask(task: Task) {
    this.todosService.selectTask(task);
  }

  triggerHover() {
    this.hovered = !this.hovered
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
