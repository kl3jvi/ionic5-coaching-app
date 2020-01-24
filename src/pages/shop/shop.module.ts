import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../../shared/common/common.module';
import { ShopBasketComponent } from './components/shop-basket/shop-basket.component';
import { CheckoutAddressComponent } from './components/shop-checkout/checkout-address/checkout-address.component';
import { CheckoutPaymentComponent } from './components/shop-checkout/checkout-payment/checkout-payment.component';
import { CheckoutPersonalComponent } from './components/shop-checkout/checkout-personal/checkout-personal.component';
import { ShopCheckoutComponent } from './components/shop-checkout/shop-checkout.component';
import { ShopHomeComponent } from './components/shop-home/shop-home.component';
import { ShopItemDetailComponent } from './components/shop-item-detail/shop-item-detail.component';
import { ShopItemsComponent } from './components/shop-items/shop-items.component';
import { ShopPaymentCompleteComponent } from './components/shop-payment-complete/shop-payment-complete.component';
import { ShopProfileComponent } from './components/shop-profile/shop-profile.component';
import { ShopSearchComponent } from './components/shop-search/shop-search.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            component: ShopHomeComponent
          },
          {
            path: ':category',
            component: ShopItemsComponent
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            component: ShopSearchComponent
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            component: ShopProfileComponent
          }
        ]
      },
      {
        path: 'basket',
        children: [
          {
            path: '',
            component: ShopBasketComponent
          }
        ]
      },
      {
        path: 'complete',
        children: [
          {
            path: '',
            component: ShopPaymentCompleteComponent
          }
        ]
      },
      {
        path: '',
        redirectTo: '/shop/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ShopComponent,
    ShopHomeComponent,
    ShopBasketComponent,
    ShopCheckoutComponent,
    ShopItemDetailComponent,
    ShopSearchComponent,
    ShopProfileComponent,
    ShopPaymentCompleteComponent,
    ShopItemsComponent,
    CheckoutAddressComponent,
    CheckoutPaymentComponent,
    CheckoutPersonalComponent
  ],
  entryComponents: [ShopItemDetailComponent, ShopCheckoutComponent],
  imports: [CommonModule, AppCommonModule, RouterModule.forChild(routes)]
})
export class ShopModule {}
