import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../shared/task.model';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task
  checked: boolean;

  constructor() { }

  ngOnInit() {
  }

  handleCheck() {
    this.checked = !this.checked;
  }

  selectTask(task: Task) {
  }

}
