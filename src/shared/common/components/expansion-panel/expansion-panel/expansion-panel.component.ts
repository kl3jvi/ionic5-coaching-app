import { Component, ContentChild, Input, OnInit, Optional, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnInit {
  public isBodyVisible: boolean = false;

  public toggle: Subject<boolean> = new Subject<boolean>();

  @Input() public open: boolean = false;

  @ContentChild('title') public titleTemplate: TemplateRef<any>;

  @ContentChild('body') public bodyTemplate: TemplateRef<any>;

  public ngOnInit(): void {
    this.isBodyVisible = this.open;
  }

  public onClick(): void {
    this.isBodyVisible = !this.isBodyVisible;
    this.toggle.next(this.isBodyVisible);
  }
}
