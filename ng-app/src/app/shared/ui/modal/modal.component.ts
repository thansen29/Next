import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() mode: string;
  constructor() { }

  ngOnInit() {
  }

}
