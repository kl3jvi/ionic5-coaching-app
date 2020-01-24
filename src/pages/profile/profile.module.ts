import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../shared/common/common.module';
import { AddMeasurementComponent } from './components/add-measurement/add-measurement.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    AddMeasurementComponent
  ],
  entryComponents: [EditProfileComponent, AddMeasurementComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: 'edit',
        component: EditProfileComponent
      }
    ])
  ]
})
export class ProfileModule {}
