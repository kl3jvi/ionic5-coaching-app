import { Component, Injector, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Extender } from '../../../../shared/helpers/extender';
import { ITrainer } from '../../../../shared/models';

@Component({
  selector: 'app-trainer-reviews',
  templateUrl: './trainer-reviews.component.html',
  styleUrls: ['./trainer-reviews.component.scss']
})
export class TrainerReviewsComponent extends Extender implements OnInit {
  public trainer: ITrainer;

  constructor(protected injector: Injector, private navparams: NavParams) {
    super(injector);
  }

  public ngOnInit() {
    this.trainer = this.navparams.get('data');
  }
}
