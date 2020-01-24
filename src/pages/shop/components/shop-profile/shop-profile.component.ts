import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Extender } from '../../../../shared/helpers/extender';
import { BasketService } from '../../services/basket/basket.service';
import { ShopItemDetailComponent } from '../shop-item-detail/shop-item-detail.component';

@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.component.html',
  styleUrls: ['./shop-profile.component.scss']
})
export class ShopProfileComponent extends Extender implements OnInit {
  public segmentChange: boolean = false;
  public recentOrders: any[] = [];
  public wishListProducts: any[] = [];
  public productsRef: AngularFirestoreCollection<any>;
  public wishListProductsRef: AngularFirestoreCollection<unknown>;
  public ordersRef: AngularFirestoreCollection<any>;
  public orderHistory: any[];
  public personalInfo: string[] = ['fullname', 'email', 'phone'];

  constructor(protected injector: Injector, private basket$: BasketService) {
    super(injector);
  }

  public get basketService(): BasketService {
    return this.basket$;
  }

  public ngOnInit() {
    this._getWishListProducts();
    this._getOrderHistory();
  }

  public removeWishItem(item) {
    this.wishListProductsRef
      .doc(item.pid)
      .delete()
      .then(() => this.toast('Item has been removed'));
  }

  public async shopItem(item) {
    const modal = await this.modalCtrl.create({
      component: ShopItemDetailComponent,
      componentProps: { data: item }
    });
    modal.present();
  }

  private _getOrderHistory() {
    this.auth$.user$.subscribe((user) => {
      this.ordersRef = this.afStore$.collection(`users/${user.uid}/orders`);
      this.ordersRef
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data() as any;
              const pid = a.payload.doc.id;
              return { pid, ...data };
            })
          )
        )
        .subscribe((items) => {
          this.status = '';
          this.orderHistory = items;
        });
    });
  }

  private _getWishListProducts() {
    this.status = 'load';
    this.auth$.user$.subscribe((user) => {
      this.wishListProductsRef = this.afStore$.collection(
        `users/${user.uid}/shop-wish-list`
      );
      this.wishListProductsRef
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data() as any;
              const pid = a.payload.doc.id;
              return { pid, ...data };
            })
          )
        )
        .subscribe((products) => {
          this.status = '';
          this.wishListProducts = products;
        });
    });
  }
}
