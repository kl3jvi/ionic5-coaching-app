import { Component, Injector, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Extender } from '../../../../shared/helpers/extender';
import { ITrainer } from '../../../../shared/models';

@Component({
  selector: 'app-trainer-appointment',
  templateUrl: './trainer-appointment.component.html',
  styleUrls: ['./trainer-appointment.component.scss']
})
export class TrainerAppointmentComponent extends Extender implements OnInit {
  public trainer: ITrainer;
  public date: { day: string; time: number };
  public appointment: {
    trainer: ITrainer;
    detail: string;
    date: string;
  };

  constructor(protected injector: Injector, private navparams: NavParams) {
    super(injector);
  }

  public ngOnInit() {
    this.trainer = this.navparams.get('data').trainer;
    this.date = this.navparams.get('data').date;
    this.appointment = {
      detail: '',
      trainer: this.trainer,
      date: new Date(
        new Date(this.date.day).getTime() + this.date.time * 1000 * 60 * 60
      ).toISOString()
    };
  }

  public manageAppt(appt) {
    this.afStore$
      .collection(`users/${this.auth$.user.uid}/appointments`)
      .add(appt)
      .then(() => {
        this.toast('Appointment Saved');
        this.closeModal();
      });
  }
}
