import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../shared/common/common.module';
import { SettingComponent } from './components/setting/setting.component';

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingComponent
      }
    ])
  ]
})
export class SettingModule {}
