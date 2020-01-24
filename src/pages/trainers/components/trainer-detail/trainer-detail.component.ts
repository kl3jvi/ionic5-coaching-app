import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Extender } from '../../../../shared/helpers/extender';
import { ITrainer } from '../../../../shared/models';
import { TrainerAppointmentComponent } from '../trainer-appointment/trainer-appointment.component';
import { TrainerChatComponent } from '../trainer-chat/trainer-chat.component';
import { TrainerPersonalComponent } from '../trainer-personal/trainer-personal.component';
import { TrainerReviewsComponent } from '../trainer-reviews/trainer-reviews.component';
import { TrainerScheduleComponent } from '../trainer-schedule/trainer-schedule.component';

@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.component.html',
  styleUrls: ['./trainer-detail.component.scss']
})
export class TrainerDetailComponent extends Extender implements OnInit {
  public trainer: ITrainer = null;
  public trainerRef: AngularFirestoreDocument<ITrainer>;

  constructor(
    protected injector: Injector,
    private _socialShare: SocialSharing,
    private _callNumber: CallNumber
  ) {
    super(injector);
  }

  public ngOnInit() {
    this.status = 'load';
    this.trainerRef = this.afStore$.doc(
      `trainers/${this.activatedRoute.snapshot.params.id}`
    );
    this.trainerRef.valueChanges().subscribe((trainer) => {
      this.status = '';
      trainer.id = this.activatedRoute.snapshot.params.id;
      this.trainer = trainer;
    });
  }

  public async book() {
    const modal = await this.modalCtrl.create({
      component: TrainerAppointmentComponent,
      componentProps: {
        data: {
          appointment: null,
          trainer: this.trainer,
          date: {
            day: new Date().toISOString(),
            time: new Date().getHours()
          }
        }
      }
    });
    modal.present();
  }

  public async personal(trainer: ITrainer) {
    const modal = await this.modalCtrl.create({
      component: TrainerPersonalComponent,
      componentProps: { data: trainer }
    });
    modal.present();
  }

  public async schedule(trainer: ITrainer) {
    const modal = await this.modalCtrl.create({
      component: TrainerScheduleComponent,
      componentProps: { data: trainer }
    });
    modal.present();
  }

  public async reviews(trainer: ITrainer) {
    const modal = await this.modalCtrl.create({
      component: TrainerReviewsComponent,
      componentProps: { data: trainer }
    });
    modal.present();
  }

  public share() {
    this._socialShare
      .share(
        this.trainer.achievements.toString(),
        `Check out trainer ${this.trainer.fullname}`,
        null,
        null
      )
      .catch((error) => this.toast(error));
  }

  public async chat(trainer: ITrainer) {
    const modal = await this.modalCtrl.create({
      component: TrainerChatComponent,
      componentProps: { data: trainer }
    });
    modal.present();
  }

  public async call(trainer: ITrainer) {
    await this._callNumber
      .callNumber(trainer.phone, null)
      .catch((error) => this.toast(error));
  }
}
