import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { NavParams } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Extender } from '../../../../shared/helpers/extender';
import { IUser } from '../../../../shared/models';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss']
})
export class AddMeasurementComponent extends Extender implements OnInit {
  public goal: { title: string; code: string; value: any; units: any } = {
    title: '',
    code: null,
    value: null,
    units: null
  };
  public user: IUser = this.auth$.user;
  public userRef: AngularFirestoreDocument<IUser>;
  public items: any[];

  constructor(protected injector: Injector, private navParams: NavParams) {
    super(injector);
  }

  public ngOnInit() {
    this.goal = { ...this.navParams.get('data') };
    this.goal.value = null;
    this.userRef = this.afStore$.doc<IUser>(`users/${this.auth$.user.uid}`);
    this.userRef
      .collection(`${this.goal.code}`)
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
      .subscribe((items) => {
        this.status = '';
        this.items = items;
      });
  }

  public save() {
    this.afStore$
      .doc(`users/${this.user.uid}`)
      .collection(`${this.goal.code}`)
      .add({ value: this.goal.value, date: new Date().getTime() })
      .then(() => this.updateUser())
      .catch(() => this.closeModal());
  }

  public updateUser() {
    this.user[this.goal.code] = this.goal.value;
    this.userRef
      .set(this.user, { merge: true })
      .then(() => {
        this.closeModal();
      })
      .catch((err) => {
        this.toast(err);
        this.closeModal();
      });
  }
}
