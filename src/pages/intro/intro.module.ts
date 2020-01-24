import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../shared/common/common.module';
import { IntroComponent } from './components/intro/intro.component';

@NgModule({
  declarations: [IntroComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IntroComponent,
      },
    ]),
  ],
})
export class IntroModule {}
