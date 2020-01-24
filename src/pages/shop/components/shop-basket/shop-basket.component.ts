import { Component, Injector, OnInit } from '@angular/core';
import { OrderByPipe } from '../../../../shared/common/pipes/order-by/order-by.pipe';
import { Extender } from '../../../../shared/helpers/extender';
import { BasketService } from '../../services/basket/basket.service';
import { ShopCheckoutComponent } from '../shop-checkout/shop-checkout.component';
import { ShopItemDetailComponent } from '../shop-item-detail/shop-item-detail.component';

@Component({
  providers: [OrderByPipe],
  selector: 'app-shop-basket',
  templateUrl: './shop-basket.component.html',
  styleUrls: ['./shop-basket.component.scss']
})
export class ShopBasketComponent extends Extender implements OnInit {
  public products: any[] = [];
  public get total(): number {
    let total = 0;
    this.products.forEach((element) => {
      total += element.amount * element.price;
    });
    return total;
  }
  constructor(
    protected injector: Injector,
    private basket$: BasketService,
    private orderBy: OrderByPipe
  ) {
    super(injector);
  }
  public ionViewDidEnter() {
    this.formatBasket(this.basket$.cartItems);
  }

  public ngOnInit() {}

  public async open(item) {
    const modal = await this.modalCtrl.create({
      component: ShopItemDetailComponent,
      componentProps: { data: item }
    });
    modal.present();
  }

  public remove(item) {
    this.basket$.remove(item);
    this.formatBasket(this.basket$.cartItems);
  }

  public async checkout() {
    this.basket$.cartTotal = (this.total * 20) / 100 + this.total;
    const modal = await this.modalCtrl.create({
      component: ShopCheckoutComponent
    });
    modal.present();
  }

  public formatBasket(items) {
    this.products = [...this.orderBy.transform(items, 'id')];
    let current = null;
    const productsBK = [];
    this.products.forEach((element) => {
      if (element !== current) {
        current = element;
        productsBK.push(element);
      } else {
        productsBK[productsBK.length - 1].amount += 1;
      }
    });
    this.products = productsBK;
  }
}
