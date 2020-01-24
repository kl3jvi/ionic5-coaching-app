import { Component, Injector, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Extender } from '../../../../shared/helpers/extender';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent extends Extender implements OnInit {
  public appointments: any[];
  public showlist: boolean = false;
  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
    this._getUserAppts();
  }

  public async manageAppt(date, appt) {
    const modal = await this.modalCtrl.create({
      component: AppointmentComponent,
      componentProps: { data: { appointment: appt, date } }
    });

    modal.present();
  }

  private _getUserAppts() {
    this.status = 'load';
    this.auth$.user$.subscribe((user) => {
      this.afStore$
        .collection(`users/${user.uid}/appointments`)
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data() as any;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        )
        .subscribe((appts) => {
          this.status = '';
          this.appointments = appts;
        });
    });
  }
}
