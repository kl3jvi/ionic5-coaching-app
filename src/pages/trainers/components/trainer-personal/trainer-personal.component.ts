import { Component, Injector, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Extender } from '../../../../shared/helpers/extender';
import { ITrainer } from '../../../../shared/models';

@Component({
  selector: 'app-trainer-personal',
  templateUrl: './trainer-personal.component.html',
  styleUrls: ['./trainer-personal.component.scss']
})
export class TrainerPersonalComponent extends Extender implements OnInit {
  public trainer: ITrainer;

  constructor(protected injector: Injector, private navparams: NavParams) {
    super(injector);
  }

  public ngOnInit() {
    this.trainer = this.navparams.get('data');
  }
}
