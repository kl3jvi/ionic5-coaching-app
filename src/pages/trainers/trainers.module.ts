import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarModule } from '../../shared/common/calendar/calendar.module';
import { AppCommonModule } from '../../shared/common/common.module';
import { TrainerAppointmentComponent } from './components/trainer-appointment/trainer-appointment.component';
import { TrainerChatComponent } from './components/trainer-chat/trainer-chat.component';
import { TrainerDetailComponent } from './components/trainer-detail/trainer-detail.component';
import { TrainerPersonalComponent } from './components/trainer-personal/trainer-personal.component';
import { TrainerReviewsComponent } from './components/trainer-reviews/trainer-reviews.component';
import { TrainerScheduleComponent } from './components/trainer-schedule/trainer-schedule.component';
import { TrainersComponent } from './components/trainers/trainers.component';

@NgModule({
  declarations: [
    TrainersComponent,
    TrainerDetailComponent,
    TrainerPersonalComponent,
    TrainerScheduleComponent,
    TrainerReviewsComponent,
    TrainerChatComponent,
    TrainerAppointmentComponent
  ],
  entryComponents: [
    TrainerPersonalComponent,
    TrainerScheduleComponent,
    TrainerReviewsComponent,
    TrainerChatComponent,
    TrainerAppointmentComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    CalendarModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrainersComponent
      },
      {
        path: ':id',
        component: TrainerDetailComponent
      }
    ])
  ]
})
export class TrainersModule {}
