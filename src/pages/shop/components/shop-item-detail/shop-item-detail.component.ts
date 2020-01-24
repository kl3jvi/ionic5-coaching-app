import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavParams } from '@ionic/angular';
import { Extender } from '../../../../shared/helpers/extender';
import { BasketService } from '../../services/basket/basket.service';

@Component({
  selector: 'app-shop-item-detail',
  templateUrl: './shop-item-detail.component.html',
  styleUrls: ['./shop-item-detail.component.scss']
})
export class ShopItemDetailComponent extends Extender implements OnInit {
  public id: string;
  public product: any = null;
  public model: any = { size: '', flavour: '' };
  public productsRef: AngularFirestoreCollection<any>;

  constructor(
    protected injector: Injector,
    private navparams: NavParams,
    private basket$: BasketService
  ) {
    super(injector);
  }

  public get basketService(): BasketService {
    return this.basket$;
  }

  public ngOnInit() {
    this.product = this.navparams.get('data');
    this.model = { ...this.product };
  }

  public add2Cart(product) {
    product.amount = 1;
    this.basket$.add(product);
  }
}
