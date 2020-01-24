import { AfterViewChecked, Component, Injector, OnInit } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { NavParams } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { messages } from '../../../../assets/data/messages';
import { Extender } from '../../../../shared/helpers/extender';
import { ITrainer } from '../../../../shared/models';

@Component({
  selector: 'app-trainer-chat',
  templateUrl: './trainer-chat.component.html',
  styleUrls: ['./trainer-chat.component.scss']
})
export class TrainerChatComponent extends Extender
  implements OnInit, AfterViewChecked {
  public trainer: ITrainer;
  public trainerRef: AngularFirestoreDocument<ITrainer>;
  public chatRef: AngularFirestoreCollection<any>;
  public chat: any;
  public chatId: Promise<void>;
  public message: string;

  constructor(protected injector: Injector, private navparams: NavParams) {
    super(injector);
  }
  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public ngOnInit() {
    this.trainer = this.navparams.get('data');
    this.trainerRef = this.afStore$.doc(`trainers/${this.trainer.id}`);
    this.chatRef = this.trainerRef.collection<any>('chats');
    this.get();
  }

  public async get() {
    const { uid } = await this.auth$.getUser();
    return this.chatRef
      .doc(uid)
      .snapshotChanges()
      .subscribe((doc) => {
        if (doc.payload.exists) {
          this.chat = { id: doc.payload.id, ...doc.payload.data() };
        } else {
          this.chat = this.create(uid);
        }
      });
  }

  public create(uid) {
    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    return this.chatRef
      .doc(uid)
      .set(data)
      .then((data) => {
        return data;
      });
  }

  public async sendMessage(content) {
    const { uid } = await this.auth$.getUser();

    const data = {
      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
      this.message = '';
      const ref = this.chatRef.doc(uid);
      return ref
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion(data)
        })
        .then(() => {
          this.scrollToBottom();
          this.autoReply();
        });
    }
  }

  public async autoReply() {
    const data = {
      uid: this.trainer.id,
      content: messages[Math.floor(Math.random() * messages.length)],
      createdAt: Date.now()
    };
    setTimeout(() => {
      if (this.trainer.id) {
        const ref = this.chatRef.doc(this.auth$.user.uid);
        return ref
          .update({
            messages: firebase.firestore.FieldValue.arrayUnion(data)
          })
          .then(() => this.scrollToBottom());
      }
    }, Math.floor(Math.random() * 6000) + 1000);
  }

  public scrollToBottom(): void {
    const element = document.getElementById('last-item');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }
}
