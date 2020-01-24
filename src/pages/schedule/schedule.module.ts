import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarModule } from '../../shared/common/calendar/calendar.module';
import { AppCommonModule } from '../../shared/common/common.module';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

@NgModule({
  declarations: [ScheduleComponent, AppointmentComponent],
  entryComponents: [AppointmentComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    CalendarModule,
    RouterModule.forChild([
      {
        path: '',
        component: ScheduleComponent
      }
    ])
  ]
})
export class ScheduleModule {}
