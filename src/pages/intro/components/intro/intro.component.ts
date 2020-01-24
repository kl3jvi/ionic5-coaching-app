import { Component, Injector, OnInit } from '@angular/core';
import { Extender } from '../../../../shared/helpers/extender';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent extends Extender implements OnInit {
  public categories: Array<{ icon: string; text: string; url: string, bgUrl: string }> = [
    {
      icon: 'assets/icon/bag.svg',
      text: 'Check out our Blog',
      url: this.routes.blogs,
      bgUrl: ''
    },
   /* {
      icon: 'assets/icon/activity.svg',
      text: 'Nearby Services',
      url: this.routes.gyms,
      bgUrl: 'assets/icon/activity/svg'
    },*/
    {
      icon: 'assets/icon/activity2.svg',
      text: 'Browse Coaches',
      url: this.routes.trainers,
      bgUrl: 'assets/images/trainers/'
    },
    {
      icon: 'assets/icon/cart.svg',
      text: 'Shop our Products',
      url: this.routes.shop,
      bgUrl: 'assets/images/shop',
    },
  ];
  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {}

  public async openOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            this.auth$.signOut();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }
}
