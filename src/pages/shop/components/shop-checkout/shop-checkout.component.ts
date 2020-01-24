import { Component, Injector, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Extender } from '../../../../shared/helpers/extender';
import { BasketService } from '../../services/basket/basket.service';

@Component({
  selector: 'app-shop-checkout',
  templateUrl: './shop-checkout.component.html',
  styleUrls: ['./shop-checkout.component.scss'],
})
export class ShopCheckoutComponent extends Extender implements OnInit {
  public checkoutOptions: any = [
    {
      key: 'personal',
      title: 'Personal Information',
      completed: false,
    },
    {
      key: 'billing',
      title: 'Billing Address',
      completed: false,
    },
    {
      key: 'shipping',
      title: 'Shipping Address',
      completed: false,
    },
    {
      key: 'payment',
      title: 'Payment details',
      completed: false,
    },
  ];

  public checkout: {
    personal: ICheckoutPersonal;
    billing: ICheckoutAddress[];
    shipping: ICheckoutAddress[];
    payment: ICheckoutPayment[];
  } = { personal: null, billing: [], shipping: [], payment: [] };

  public model: {
    personal: ICheckoutPersonal;
    billing: ICheckoutAddress;
    shipping: ICheckoutAddress;
    payment: ICheckoutPayment;
  } = { personal: null, billing: {}, shipping: {}, payment: {} };

  constructor(protected injector: Injector, private basket$: BasketService) {
    super(injector);
  }

  public ngOnInit() {
    this.auth$.user$.subscribe((user) => {
      this.checkout.personal = this.model.personal = user;

      const payment$ = this.afStore$
        .doc(`users/${user.uid}`)
        .collection('payments')
        .valueChanges();
      const addresses$ = this.afStore$
        .doc(`users/${user.uid}`)
        .collection('addresses')
        .valueChanges();

      payment$.subscribe((result: any) => {
        this.checkout.payment = result;
      });
      addresses$.subscribe((result: any) => {
        this.checkout.billing = result && result.filter((address) => address.type === 'billing');
        this.checkout.shipping = result && result.filter((address) => address.type === 'shipping');
      });
    });
  }

  public addBilling(item) {
    this.model.billing = item;
  }

  public pay() {
    this.status = 'load';
    setTimeout(() => {
      this.status = '';
      this.closeModal();
      this.basket$.orderDetails = this.model;
      this.gotoPage(this.routes.shopComplete);
    }, 2000);
  }
}

export interface ICheckoutPersonal {
  fullname: string;
  email: string;
}

export interface ICheckoutAddress {
  type?: string;
  name?: string;
  addressline1?: string;
  addressline2?: string;
  city?: string;
  postcode?: string;
  country?: string;
}

export interface ICheckoutPayment {
  number?: string;
  ccv?: string;
  exp?: string;
  name?: string;
}
