import { Component, OnInit, Input } from '@angular/core';
import { IBlogComment } from '../../../models';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() public data: IBlogComment;
  constructor() {}

  public ngOnInit() {}
}
