import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';

@Component({
  selector: 'app-todos-home',
  templateUrl: './todos-home.component.html',
  styleUrls: ['./todos-home.component.scss']
})
export class TodosHomeComponent implements OnInit {
  currentRoute: string;
  constructor(private router: Router) { }

  ngOnInit() {  
    this.currentRoute = this.router.url;
    this.router.events.subscribe(
      (event: Event) => {
        this.currentRoute = event['url'];
      }
    )
  }

}
