import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../shared/common/common.module';
import { WalkthroughComponent } from './components/walkthrough/walkthrough.component';

@NgModule({
  declarations: [WalkthroughComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WalkthroughComponent
      }
    ])
  ]
})
export class WalkthroughModule {}
