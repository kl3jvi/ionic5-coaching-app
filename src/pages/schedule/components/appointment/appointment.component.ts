import { Component, Injector, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Extender } from '../../../../shared/helpers/extender';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent extends Extender implements OnInit {
  public date: { day: string; time: number };
  public appointment: {
    title: string;
    detail: string;
    date: string;
  };

  constructor(protected injector: Injector, private navparams: NavParams) {
    super(injector);
  }

  public ngOnInit() {
    this.appointment = this.navparams.get('data').appointment;
    this.date = this.navparams.get('data').date;
    if (!this.appointment) {
      this.appointment = {
        title: '',
        detail: '',
        date: this.navparams.get('data').date.toISOString()
      };
    }
  }

  public manageAppt(appt) {
    if (!appt.id) {
      this.afStore$
        .collection(`users/${this.auth$.user.uid}/appointments`)
        .add(appt)
        .then(() => {
          this.toast('Appointment Saved');
          this.closeModal();
        });
    } else {
      this.afStore$
        .collection(`users/${this.auth$.user.uid}/appointments`)
        .doc(appt.id)
        .update(appt)
        .then(() => {
          this.toast('Appointment Saved');
          this.closeModal();
        });
    }
  }
}
