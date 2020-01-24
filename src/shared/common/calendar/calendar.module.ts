import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppCommonModule } from '../common.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [CommonModule, IonicModule, AppCommonModule]
})
export class CalendarModule {}
