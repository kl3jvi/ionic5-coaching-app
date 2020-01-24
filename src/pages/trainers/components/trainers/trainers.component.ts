import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Extender } from '../../../../shared/helpers/extender';
import { ITrainer } from '../../../../shared/models';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent extends Extender implements OnInit {
  public openSearch: boolean = false;
  public trainers: ITrainer[] = [];
  public backup: ITrainer[] = [];
  public trainersRef: AngularFirestoreCollection<ITrainer>;
  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
    this._getTrainers();
  }

  public filter(str) {
    this.trainers = [...this.backup];

    if (str && str.trim() !== '') {
      this.trainers = this.trainers.filter((item) => {
        return (
          item.fullname.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          (item.city &&
            item.city.toLowerCase().indexOf(str.toLowerCase()) > -1) ||
          (item.gym &&
            item.gym.toLowerCase().indexOf(str.toLowerCase()) > -1) ||
          (item.skill &&
            item.skill.toLowerCase().indexOf(str.toLowerCase()) > -1)
        );
      });
    } else {
      this.openSearch = !this.openSearch;
    }
  }

  private _getTrainers(): void {
    this.status = 'load';

    this.trainersRef = this.afStore$.collection('trainers');
    this.trainersRef
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as ITrainer;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((trainers) => {
        this.status = '';
        this.trainers = this.backup = trainers;
      });
  }
}
