import { Component, Injector, Input, OnInit } from '@angular/core';
import { Extender } from '../../../../shared/helpers/extender';
import { IBlog } from '../../../../shared/models';

@Component({
  selector: 'app-diet-blog-item',
  templateUrl: './diet-blog-item.component.html',
  styleUrls: ['./diet-blog-item.component.scss']
})
export class DietBlogItemComponent extends Extender implements OnInit {
  @Input() public blog: IBlog;
  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {}
}
