import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() public status: string = '';
  @Output() public event: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public ngOnInit() {
  }

}
