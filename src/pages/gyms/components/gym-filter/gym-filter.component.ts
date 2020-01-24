import { Component, Injector, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Extender } from '../../../../shared/helpers/extender';

@Component({
  selector: 'app-gym-filter',
  templateUrl: './gym-filter.component.html',
  styleUrls: ['./gym-filter.component.scss']
})
export class GymFilterComponent extends Extender implements OnInit {
  public filter: { radius: number; openNow: boolean; type: string };

  public typeSelectOptions = {
    header: 'Select Type',
    data: ['gym', 'hospital', 'spa', 'doctor', 'store', 'supermarket']
  };
  constructor(protected injector: Injector, private navParams: NavParams) {
    super(injector);
  }

  public ngOnInit() {
    this.filter = this.navParams.get('data');
    if (!this.filter) {
      this.filter = {
        radius: 0,
        openNow: false,
        type: null
      };
    }
  }

  public save() {
    this.closeModal(this.filter);
  }
}
