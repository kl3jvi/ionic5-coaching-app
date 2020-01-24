import { Injectable } from '@angular/core';
import {
  ICheckoutAddress,
  ICheckoutPayment,
  ICheckoutPersonal
} from '../../components/shop-checkout/shop-checkout.component';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public cartItems: any[] = [];
  public cartTotal: number;

  public orderDetails: {
    personal: ICheckoutPersonal;
    billing: ICheckoutAddress;
    shipping: ICheckoutAddress;
    payment: ICheckoutPayment;
  };
  constructor() {}

  public add(item) {
    this.cartItems.push(item);
  }
  public remove(item) {
    this.cartItems = this.cartItems.filter((_item) => _item.id !== item.id);
  }

  public clear() {
    this.cartItems = [];
    this.cartTotal = 0;
  }
}
