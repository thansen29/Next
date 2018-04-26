import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Subscription } from 'rxjs/Subscription';
import { Navigation } from 'selenium-webdriver';

@Component({
  selector: 'app-todos-home',
  templateUrl: './todos-home.component.html',
  styleUrls: ['./todos-home.component.scss']
})
export class TodosHomeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  previousUrl: string;
  constructor(private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.router.navigate(['todos']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
