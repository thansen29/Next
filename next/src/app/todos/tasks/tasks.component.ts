import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { TodosService } from '../todos.service';
import { AppState } from '../../store/app.reducer';
import { Task } from '../../shared/task.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('formDetails', [
      state('formState', style({
        'opacity': 1,
        transform: 'translateY(0px)'
      })),
      transition('void => *', [
        style({
          'opacity': 0,
          transform: 'translateY(-100%)'
        }),
        animate(300)
      ]),
    ]),
    trigger('taskData', [
      state('taskState', style({
        'opacity': 1,
        transform: 'translateY(0px)'
      })),
      transition('void => *', [
        style({
          'opacity': 0,
          transform: 'translateY(-100%)'
        }),
        animate(300)
      ]),
    ]),
    
  ]
})
export class TasksComponent implements OnInit, OnDestroy {
  completedTasks: Task[];
  incompleteTasks: Task[];
  id: number;
  subscription: Subscription;
  focused: boolean = false;

  listName: string;
  taskCount: number;
  completedCount: number;
  listSub: Subscription;
  
  selectedTab = 0;
  checkedTasks = [];
  viewingTask: boolean;

  hidden = true;
  dropdown = false;
  nameSort = false;
  dateSort = false;
  
  constructor(private store: Store<AppState>,
              private todosService: TodosService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.todosService.clearTasks()
    this.id = +this.route.snapshot.params['id'];
    this.todosService.fetchTasks(this.id);

    this.viewingTask = this.router.url.includes('tasks');
    this.router.events
      .subscribe(
        (event) => {
          if (event instanceof NavigationEnd) {
            this.viewingTask = event.url.includes('task');
          }
        }
      )

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );
    
    this.subscription = this.store.select('task')
      .subscribe(
        (state) => {
          this.completedTasks = _.filter(state.tasks, ['completed', true]);
          this.completedTasks = _.map(this.completedTasks, task => {
              return new Task(task.id, task.title, task.description, task.created_at, task.completed, task.updated_at);
          });

          this.incompleteTasks = _.filter(state.tasks, ['completed', false]);  
          this.incompleteTasks = _.map(this.incompleteTasks, task => {
            return new Task(task.id, task.title, task.description, task.created_at, task.completed, task.updated_at);
          });        

          this.taskCount = _.size(state.tasks);
          this.completedCount = _.filter(state.tasks, ['completed', true]).length;

          if (this.nameSort) {
            this.completedTasks = _.sortBy(this.completedTasks, [task => task.title.toLowerCase()], ['title']);
            this.incompleteTasks = _.sortBy(this.incompleteTasks, [task => task.title.toLowerCase()], ['title']);
          }

          if (this.dateSort) {
            this.completedTasks = this.completedTasks.reverse();
            this.incompleteTasks = this.incompleteTasks.reverse();
          }
          
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

  sortNames() {
    this.dateSort = false;
    this.nameSort = true;
    this.completedTasks = _.sortBy(this.completedTasks, [task => task.title.toLowerCase()], ['title']);
    this.incompleteTasks = _.sortBy(this.incompleteTasks, [task => task.title.toLowerCase()], ['title']);
  }

  sortDates() {
    console.log(this.incompleteTasks);
    this.nameSort = false;    
    this.dateSort = true;
    this.completedTasks = this.completedTasks.reverse();
    this.incompleteTasks = this.incompleteTasks.reverse();
    console.log(this.incompleteTasks);
    
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  toggleHidden() {
    this.hidden = !this.hidden;
  }

  focus() {
    this.focused = true; 
  }

  unfocus() {
    this.focused = false; 
  }

  checkItem(id: number) {
    if (this.checkedTasks.includes(id)) {
      this.checkedTasks.splice(this.checkedTasks.indexOf(id), 1);
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
    if (this.checkedTasks.length) {
      this.todosService.deleteTasks(this.checkedTasks);
      this.router.navigate(['/lists', this.id]);
      this.checkedTasks = [];
    }
  }

  completeTasks() {
    this.todosService.completeTasks(this.checkedTasks);
    this.checkedTasks = [];    
  }

  clearCheckedTasks() {
    this.checkedTasks = [];
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  closeTaskView() {
    this.router.navigate(['/lists', this.id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.listSub.unsubscribe();
    this.todosService.clearEverything();
  }

}
