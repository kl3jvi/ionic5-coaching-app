import {
  Component,
  Injector,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NavParams } from '@ionic/angular';
import { map } from 'rxjs/internal/operators/map';
import { CalendarComponent } from '../../../../shared/common/calendar/calendar.component';
import { Extender } from '../../../../shared/helpers/extender';
import { ITrainer } from '../../../../shared/models';
import { TrainerAppointmentComponent } from '../trainer-appointment/trainer-appointment.component';

@Component({
  selector: 'app-trainer-schedule',
  templateUrl: './trainer-schedule.component.html',
  styleUrls: ['./trainer-schedule.component.scss']
})
export class TrainerScheduleComponent extends Extender implements OnInit {
  public trainer: ITrainer;
  public view: string = 'calendar';
  public appointments: any[] = [];
  @ViewChild('calendar') public calendar: CalendarComponent;
  public availableTimes: Array<{
    hour: any[];
    available: any;
    appointment: any;
  }> = [];
  constructor(protected injector: Injector, private navparams: NavParams) {
    super(injector);
  }

  public ngOnInit() {
    this.trainer = this.navparams.get('data');
    this._getUserAppts();
  }
  public getAvailableTimes() {
    const _data = [];
    for (let i = 9; i < 21; i++) {
      _data.push({
        hour: `${i < 10 ? '0' : ''}${i}:00`,
        available:
          i % Math.floor(Math.random() * 5)
            ? 'other'
            : this.isUserAppt(i)
            ? 'user'
            : 'none',
        appointment: this.isUserAppt
      });
    }
    this.availableTimes = _data;
  }

  public async notAvailableAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Not Avaiable',
      message: `${
        this.trainer.fullname
      } is not available for any appointments at this time`,
      buttons: [
        {
          role: 'cancel',
          text: 'Close'
        }
      ]
    });
    alert.present();
  }

  public async open(hour: string, appt?: any) {
    const modal = await this.modalCtrl.create({
      component: TrainerAppointmentComponent,
      componentProps: {
        data: {
          appointment: appt,
          trainer: this.trainer,
          date: {
            day: this.calendar.selectedDay.date.toISOString(),
            time: +hour.substring(0, hour.indexOf(':'))
          }
        }
      }
    });
    modal.present();
  }

  private _getUserAppts() {
    this.afStore$
      .collection(`users/${this.auth$.user.uid}/appointments`)
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
        this.getAvailableTimes();
      });
  }

  private isUserAppt(hour): any {
    return this.appointments.find(
      (item) =>
        new Date(item.date).getTime() ===
        new Date(
          new Date(this.calendar.selectedDay.date).getTime() +
            hour * 1000 * 60 * 60
        ).getTime()
    );
  }
}
