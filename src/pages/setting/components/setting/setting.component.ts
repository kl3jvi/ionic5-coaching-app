import { Component, Injector, OnInit } from '@angular/core';

import { Extender } from '../../../../shared/helpers/extender';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent extends Extender implements OnInit {
  public settings: Array<{
    title: string;
    open: boolean;
    items: Array<{ text: string; icon: string; selected?: boolean }>;
  }> = [
    {
      title: 'Connect Accounts',
      open: true,
      items: [
        {
          icon: 'assets/images/other/apple-health.png',
          text: 'Apple Health'
        },
        {
          icon: 'assets/images/other/fitbit.jpg',
          text: 'Fitbit'
        },
        {
          icon: 'assets/images/other/micoach.png',
          text: 'Addidas Micoach'
        },
        {
          icon: 'assets/images/other/nike-run.png',
          text: 'Apple Health'
        }
      ]
    },
    {
      title: 'Notifications',
      open: false,
      items: [
        {
          icon: 'assets/icon/download.svg',
          text: 'Push Notifications'
        },
        {
          icon: 'assets/icon/envelope.svg',
          text: 'Email Notifications'
        },
        {
          icon: 'assets/icon/bubble.svg',
          text: 'Allow Auto Reply'
        }
      ]
    }
  ];

  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {}
}
