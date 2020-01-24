import { AfterViewInit, Component, ContentChildren, OnDestroy, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(ExpansionPanelComponent)
  public panels: QueryList<ExpansionPanelComponent>;

  private _subscriptions: Subscription = new Subscription();

  public ngAfterViewInit() {
    if (this.panels) {
      this.panels.forEach((panel) => {
        this._subscriptions.add(this._subscribeToPanel(panel));
      });
    }
  }

  public ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private _subscribeToPanel(currentPanel: ExpansionPanelComponent): Subscription {
    return currentPanel.toggle.subscribe((show) => {
      if (show) {
        this.panels.forEach((panel) => {
          panel.isBodyVisible = false;
        });

        currentPanel.isBodyVisible = true;
      }
    });
  }
}
