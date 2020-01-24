import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { MomentModule } from 'angular2-moment';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { AccordionComponent } from './components/expansion-panel/accordion/accordion.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel/expansion-panel.component';
import { GoalsGridComponent } from './components/goals-grid/goals-grid.component';
import { RatingComponent } from './components/rating/rating.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SimpleItemComponent } from './components/simple-item/simple-item.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CreditCardImageDirective } from './directives/credit-card-image.directive';
import { ElasticDirective } from './directives/elastic/elastic.directive';
import { ImageLoaderDirective } from './directives/image-loader/image-loader';
import { FormFieldModule } from './form-field/form-field.module';
import { CustomCurrencyPipe } from './pipes/currency/custom-currency.pipe';
import { FormatPipe } from './pipes/format/format.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { CommonService } from './services/common/common.service';

@NgModule({
  declarations: [
    SpinnerComponent,
    ImageLoaderDirective,
    ElasticDirective,
    RatingComponent,
    SearchBarComponent,
    CustomCurrencyPipe,
    FormatPipe,
    OrderByPipe,
    EmptyDataComponent,
    GoalsGridComponent,
    SimpleItemComponent,
    CommentItemComponent,
    AccordionComponent,
    ExpansionPanelComponent,
    CreditCardImageDirective,
  ],
  exports: [
    SpinnerComponent,
    ImageLoaderDirective,
    ElasticDirective,
    RatingComponent,
    SearchBarComponent,
    CustomCurrencyPipe,
    FormatPipe,
    OrderByPipe,
    SimpleItemComponent,
    CommentItemComponent,
    GoalsGridComponent,
    EmptyDataComponent,
    IonicModule,
    FormsModule,
    FormFieldModule,
    MomentModule,
    CreditCardDirectivesModule,
    AccordionComponent,
    ExpansionPanelComponent,
    CreditCardImageDirective,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FormFieldModule,
    MomentModule,
    CreditCardDirectivesModule,
  ],
  providers: [CurrencyPipe, CustomCurrencyPipe, CommonService],
})
export class AppCommonModule {}
