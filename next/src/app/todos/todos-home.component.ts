import { Component, OnInit, OnDestroy, trigger, state, transition, style, animate } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { TodosService } from './todos.service';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-todos-home',
  templateUrl: './todos-home.component.html',
  styleUrls: ['./todos-home.component.scss'],
  animations: [
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
export class TodosHomeComponent implements OnInit, OnDestroy {
  currentRoute: string;
  subscription: Subscription;
  taskCount: number;
  completedCount: number;
  hidden = true;

  constructor(private router: Router,
              private todosService: TodosService,
              private store: Store<AppState>) { }

  ngOnInit() {  
    let url = this.router.url.split('/');
    if (!(+url[url.length-1] > 0)) {
      this.todosService.getAllTasks();
    }

    this.router.events
      .subscribe(
        (event) => {
          if (event instanceof NavigationEnd && event.url === '/lists') {
            this.todosService.getAllTasks();
          }
        }
      )

    this.subscription = this.store.select('task')
      .subscribe(
        (state) => {
          this.taskCount = _.size(state.tasks);
          this.completedCount = _.filter(state.tasks, ['completed', true]).length;
        }
      )

    this.currentRoute = this.router.url;
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event['url'];
        }
      }
    );
  }

  toggleHidden() {
    this.hidden = !this.hidden;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
