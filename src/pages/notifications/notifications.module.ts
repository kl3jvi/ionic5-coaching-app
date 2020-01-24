import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../shared/common/common.module';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotificationsComponent
      }
    ])
  ]
})
export class NotificationsModule {}
