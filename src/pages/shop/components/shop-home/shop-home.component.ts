import { Component, Injector, OnInit } from '@angular/core';
import { products } from '../../../../assets/data/products';
import { Extender } from '../../../../shared/helpers/extender';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss']
})
export class ShopHomeComponent extends Extender implements OnInit {
  public categories: Array<{ icon: string; text: string; code: string }> = [
    {
      icon: 'assets/images/shop/categories/books.webp',
      text: 'Books',
      code: 'books'
    }
  /*  {
      icon: 'assets/images/shop/categories/preworkout.png',
      text: 'Preworkouts',
      code: 'preworkout'
    },
    {
      icon: 'assets/images/shop/categories/vitamins.jpg',
      text: 'Vitamins',
      code: 'vitamin'
    },
    {
      icon: 'assets/images/shop/categories/carbs.png',
      text: 'Carbs',
      code: 'carb'
    } */
  ];
  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {}
}
