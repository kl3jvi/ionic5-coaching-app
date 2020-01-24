import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Extender } from '../../../../shared/helpers/extender';
import { INotification } from '../../../../shared/models/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

/**
 * get dummy notifications from notifications collection in firebase.
 * this uses dummy data for demonstration purposes
 */
export class NotificationsComponent extends Extender implements OnInit {
  /** stores notifications from firebase */
  public notifications: INotification[] | any[] = [];

  /** holds reference to the notification firebase collection */
  public notificationsRef: AngularFirestoreCollection<INotification>;

  constructor(protected injector: Injector) {
    super(injector);
  }

  /** subcribe to data from firebase notifications table and save data to notifications property */
  public ngOnInit(): void {
    this.notificationsRef = this.afStore$.collection<INotification>(
      `notifications`
    );
    this.notificationsRef
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as INotification;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((notifications) => (this.notifications = notifications));
  }

  public async notificationMenu(item, index) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Notification Menu',
      buttons: [
        {
          text: item.read ? 'Mark as unread' : 'Mark as read',
          handler: () => {
            item.read = item.read ? false : true;
            item.this.notifications.splice(index, 1, item);
          }
        },
        {
          text: item.complete ? 'Mark as incomplete' : 'Mark as done',
          handler: () => {
            item.complete = item.complete ? false : true;
            item.this.notifications.splice(index, 1, item);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.notifications.splice(index, 1);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await actionSheet.present();
  }

  public async openOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Notifications Options',
      buttons: [
        {
          text: 'Delete All',
          handler: () => {
            this.notifications = [];
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await actionSheet.present();
  }
}
