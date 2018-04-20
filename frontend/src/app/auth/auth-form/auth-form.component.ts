import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() page: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.page);
  }

}
