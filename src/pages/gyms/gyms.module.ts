import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../shared/common/common.module';
import { GymDetailComponent } from './components/gym-detail/gym-detail.component';
import { GymFilterComponent } from './components/gym-filter/gym-filter.component';
import { GymsComponent } from './components/gyms/gyms.component';

@NgModule({
  declarations: [GymsComponent, GymDetailComponent, GymFilterComponent],
  entryComponents: [GymFilterComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GymsComponent
      },
      {
        path: ':id',
        component: GymDetailComponent
      }
    ])
  ]
})
export class GymsModule {}
