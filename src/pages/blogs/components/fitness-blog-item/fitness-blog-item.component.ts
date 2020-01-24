import { Component, Injector, Input, OnInit } from '@angular/core';
import { Extender } from '../../../../shared/helpers/extender';
import { IBlog } from '../../../../shared/models';

@Component({
  selector: 'app-fitness-blog-item',
  templateUrl: './fitness-blog-item.component.html',
  styleUrls: ['./fitness-blog-item.component.scss']
})
export class FitnessBlogItemComponent extends Extender implements OnInit {
  @Input() public blog: IBlog;
  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {}
}
