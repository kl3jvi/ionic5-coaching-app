import { Component, Injector, Input, OnInit } from '@angular/core';
import { AddMeasurementComponent } from '../../../../pages/profile/components/add-measurement/add-measurement.component';
import { Extender } from '../../../helpers/extender';

@Component({
  selector: 'app-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss']
})
export class GoalsGridComponent extends Extender implements OnInit {
  @Input() public goals: any;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {}

  public async open(goal): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: AddMeasurementComponent,
      componentProps: { data: goal }
    });
    await modal.present();
  }
}
