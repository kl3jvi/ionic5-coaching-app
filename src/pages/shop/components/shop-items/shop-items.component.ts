import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Extender } from '../../../../shared/helpers/extender';
import { BasketService } from '../../services/basket/basket.service';
import { ShopItemDetailComponent } from '../shop-item-detail/shop-item-detail.component';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.scss']
})
export class ShopItemsComponent extends Extender implements OnInit {
  public category: string;
  public products: any[] = [];
  public wishListProducts: any[] = [];
  public productsRef: AngularFirestoreCollection<any>;
  public wishListProductsRef: AngularFirestoreCollection<any>;

  constructor(protected injector: Injector, private basket$: BasketService) {
    super(injector);
  }

  public get basketService(): BasketService {
    return this.basket$;
  }

  public ngOnInit() {
    this.category = this.activatedRoute.snapshot.params.category;
    this._getProducts();
  }

  public async shopItem(item) {
    const modal = await this.modalCtrl.create({
      component: ShopItemDetailComponent,
      componentProps: { data: item }
    });
    modal.present();
  }

  public add2Wishlist(data) {
    this.afStore$
      .collection(`users/${this.auth$.user.uid}/shop-wish-list`)
      .add(data);
  }

  public add2Cart(product) {
    product.amount = 1;
    this.basket$.add(product);
    this.toast('item added to basket');
  }

  private _getProducts() {
    this.status = 'load';

    this.productsRef = this.afStore$.collection('products', (ref) =>
      ref.where('category', '==', this.category.toLowerCase())
    );
    this.productsRef
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((products) => {
        this.status = '';
        this.products = products;
        this._getWishListProducts();
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
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        )
        .subscribe((products) => {
          this.status = '';
          this.wishListProducts = products;
          this.products.map((product) => {
            if (
              this.wishListProducts.findIndex(
                (item) => item.id === product.id
              ) === -1
            ) {
              product.alreadyWishListed = true;
            } else {
              product.alreadyWishListed = false;
            }
            return product;
          });
        });
    });
  }
}
