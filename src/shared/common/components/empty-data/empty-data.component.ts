import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent implements OnInit {
  @Input() public config: {
    showImage: boolean;
    title: string;
    subtitle: string;
  };
  constructor() {}

  public ngOnInit() {}
}
