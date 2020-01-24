import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Extender } from '../../../../shared/helpers/extender';
import { BasketService } from '../../services/basket/basket.service';
import { ShopItemDetailComponent } from '../shop-item-detail/shop-item-detail.component';

@Component({
  selector: 'app-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.scss']
})
export class ShopSearchComponent extends Extender implements OnInit {
  public products: any[] = [];
  public productsRef: AngularFirestoreCollection<any>;

  constructor(protected injector: Injector, private basket$: BasketService) {
    super(injector);
  }

  public ngOnInit() {}
  public async shopItem(item) {
    const modal = await this.modalCtrl.create({
      component: ShopItemDetailComponent,
      componentProps: { data: item }
    });
    modal.present();
  }

  public getProducts(str) {
    this.status = 'load';
    if (str && str.trim !== '') {
      this.productsRef = this.afStore$.collection('products', (ref) =>
        ref.where('name', '>', str)
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
        });
    } else {
      this.products = [];
    }
  }

  public get basketService(): BasketService {
    return this.basket$;
  }
}
