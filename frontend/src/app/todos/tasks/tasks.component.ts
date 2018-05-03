import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { TodosService } from '../todos.service';
import { AppState } from '../../store/app.reducer';
import { Task } from '../../shared/task.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  id: number;
  subscription: Subscription;
  focused: boolean = false;

  listName: string;
  taskCount: number;
  completedCount: number;
  listSub: Subscription;

  checkedTasks = [];
  
  constructor(private store: Store<AppState>,
              private todosService: TodosService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.todosService.fetchTasks(this.id);

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );
    
    this.subscription = this.store.select('task')
      .subscribe(
        (state) => {
          this.tasks = _.map(state.tasks, task => {
            return new Task(task.id, task.title, task.description, task.created_at, task.completed, task.updated_at);
          });

          this.taskCount = _.size(state.tasks);
          this.completedCount = _.filter(state.tasks, ['completed', true]).length;
        }
      );

    this.listSub = this.store.select('list')
      .subscribe(
        (state) => {
          if (state.selectedList) {
            this.listName = state.selectedList.title;
          }
        }
      )
  }

  focus() {
    this.focused = true; 
  }

  unfocus() {
    this.focused = false; 
  }

  checkItem(id: number) {
    if (this.checkedTasks.includes(id)) {
      this.checkedTasks = this.checkedTasks.splice(id, 1);
    } else {
      this.checkedTasks.push(id);
    }
  }

  onSubmit(form: NgForm) {
    const title = form.value.title;
    const description = form.value.description;
    this.todosService.createTask(title, description, this.id);
    form.reset();
  }

  deleteTasks() {
    this.todosService.deleteTasks(this.checkedTasks);
    this.router.navigate(['/lists', this.id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.listSub.unsubscribe();
    this.todosService.clearEverything();
  }

}
