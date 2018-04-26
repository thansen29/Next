import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../shared/task.model';
import { TodosService } from '../../todos.service';


@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task
  @Input() selectedId: number;
  checked: boolean;

  constructor(private todosService: TodosService) { }

  ngOnInit() {
  }

  handleCheck() {
    this.checked = !this.checked;
  }

  selectTask(task: Task) {
    this.todosService.selectTask(task);
  }

}
