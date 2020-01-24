import { Component, Injector, Input, OnInit } from '@angular/core';
import { Extender } from '../../../../shared/helpers/extender';
import { IBlog } from '../../../../shared/models';

@Component({
  selector: 'app-lifestyle-blog-item',
  templateUrl: './lifestyle-blog-item.component.html',
  styleUrls: ['./lifestyle-blog-item.component.scss']
})
export class LifestyleBlogItemComponent extends Extender implements OnInit {
  /**
   * stores number of row
   * @property rows
   * @type number[]
   */
  public rows: number[];

  /**
   * stores number of items per row
   * @property numberPerRow
   * @type number
   * @default 2
   */
  public numberPerRow: number = 4;

  @Input() public blog: IBlog;
  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
    if (this.blog.images) {
      this.rows = Array.from(Array(Math.ceil(4 / this.numberPerRow)).keys());
    }
  }
}
