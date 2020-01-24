import { Location } from '@angular/common';
import { Injector, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import {
  ActionSheetController,
  AlertController,
  MenuController,
  ModalController,
  ToastController
} from '@ionic/angular';
import { AuthService } from '../../pages/auth/services/auth.service';
import { IRoutes, Routes } from './routes';

export class Extender {
  public status: string = '';
  public loading: boolean = false;

  constructor(@Optional() private _injector: Injector) {}

  public get menuCtrl(): MenuController {
    return this._injector.get(MenuController);
  }
  public toggleMenu(): void {
    this.menuCtrl.toggle();
  }

  public get auth$(): AuthService {
    return this._injector.get(AuthService);
  }

  public get afStore$(): AngularFirestore {
    return this._injector.get(AngularFirestore);
  }

  public get afStorage(): AngularFireStorage {
    return this._injector.get(AngularFireStorage);
  }

  public get routes(): IRoutes {
    return Routes.ROUTES;
  }

  public get router(): Router {
    return this._injector.get(Router);
  }

  public back(): void {
    return this._injector.get(Location).back();
  }

  public get activatedRoute(): ActivatedRoute {
    return this._injector.get(ActivatedRoute);
  }

  public gotoPage(page, params: Params = null): Promise<any> {
    if (!params) {
      return this.router.navigate([page]);
    } else {
      return this.router.navigate([page], params);
    }
  }

  public get modalCtrl(): ModalController {
    return this._injector.get(ModalController);
  }

  public closeModal(data?: any): void {
    this.modalCtrl.dismiss(data);
  }

  public get actionSheetCtrl(): ActionSheetController {
    return this._injector.get(ActionSheetController);
  }

  public get alertCtrl(): AlertController {
    return this._injector.get(AlertController);
  }

  public async alert(header, message) {
    const alert = await this.alertCtrl.create({
      header,
      //   subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  public get toastCtrl(): ToastController {
    return this._injector.get(ToastController);
  }

  public async toast(msg): Promise<any> {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public get imagePicker(): ImagePicker {
    return this._injector.get(ImagePicker);
  }

  public getPictures(max): Promise<any> {
    const options = {
      outputType: 1,
      quality: 100,
      maximumImagesCount: max
    };
    return this.imagePicker.getPictures(options).then(
      (results) => {
        return results.map((item) => 'data:image/jpeg;base64,' + item);
      },
      (err) => {
        this.toast(err);
      }
    );
  }

  public uploadImage(imageURI, filename, store, isURI = false): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const storageRef = this.afStorage.storage.ref();
      const imageRef = storageRef.child(store).child(filename);
      if (isURI) {
        this.encodeImageUri(imageURI, (image64) => {
          imageRef.putString(image64, 'data_url').then(
            (snapshot) => {
              resolve(imageRef.getDownloadURL());
            },
            (err) => {
              reject(err);
            }
          );
        });
      } else {
        imageRef.putString(imageURI, 'data_url').then(
          (snapshot) => {
            resolve(imageRef.getDownloadURL());
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }

  public encodeImageUri(imageUri, callback) {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    const img = new Image();
    img.onload = function() {
      const aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = c.toDataURL('image/jpeg');
      callback(dataURL);
    };
    img.src = imageUri;
  }

  public getRandomSubarray(arr, size) {
    const shuffled = arr.slice(0);
    let i = arr.length;
    let temp, index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }
}
