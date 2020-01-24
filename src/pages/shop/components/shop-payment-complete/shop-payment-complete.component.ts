import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Extender } from '../../../../shared/helpers/extender';
import { BasketService } from '../../services/basket/basket.service';

@Component({
  selector: 'app-shop-payment-complete',
  templateUrl: './shop-payment-complete.component.html',
  styleUrls: ['./shop-payment-complete.component.scss']
})
export class ShopPaymentCompleteComponent extends Extender implements OnInit {
  public isSuccessful: boolean;
  public ordersRef: AngularFirestoreCollection<any>;

  constructor(protected injector: Injector, private basket$: BasketService) {
    super(injector);
  }

  public get total() {
    return this.basket$.cartTotal;
  }

  public ionViewDidEnter() {
    if (new Date().getMilliseconds() % 2 === 0) {
      this.isSuccessful = false;
    } else {
      this.isSuccessful = true;
      this.auth$.user$.subscribe((user) => {
        this.ordersRef = this.afStore$.collection(`users/${user.uid}/orders`);
        this.ordersRef.add({
          orderNumber: new Date().getTime(),
          products: this.basket$.cartItems,
          total: this.basket$.cartTotal
        });
      });
    }
  }

  public ngOnInit() {}

  public clear() {
    this.basket$.clear();
  }
}
