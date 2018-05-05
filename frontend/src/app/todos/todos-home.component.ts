import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { TodosService } from './todos.service';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-todos-home',
  templateUrl: './todos-home.component.html',
  styleUrls: ['./todos-home.component.scss']
})
export class TodosHomeComponent implements OnInit, OnDestroy {
  currentRoute: string;
  subscription: Subscription;
  taskCount: number;
  completedCount: number;

  constructor(private router: Router,
              private todosService: TodosService,
              private store: Store<AppState>) { }

  ngOnInit() {  
    this.todosService.getAllTasks();

    this.router.events
      .subscribe(
        (event) => {
          if (event instanceof NavigationEnd) {
            this.todosService.getAllTasks();
          }
        }
      )

    this.subscription = this.store.select('task')
      .subscribe(
        (state) => {
          this.taskCount = _.size(state.tasks);
          this.completedCount = _.filter(state.tasks, ['completed, true']).length;
        }
      )

    this.currentRoute = this.router.url;
    this.router.events.subscribe(
      (event: Event) => {
        this.currentRoute = event['url'];
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
