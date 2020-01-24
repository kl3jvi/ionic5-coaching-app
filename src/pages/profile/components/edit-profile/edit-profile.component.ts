import { Component, Injector, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Extender } from '../../../../shared/helpers/extender';
import { IUser } from '../../../../shared/models';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends Extender implements OnInit {
  public user: IUser = this.auth$.user;
  public genderSelectOptions = {
    header: 'Select Gender',
    data: ['Male', 'Female', 'Unspecified']
  };
  /**
   * @property cameraOptions
   * @type CameraOptions
   * @public
   */
  public cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(protected injector: Injector, private camera: Camera) {
    super(injector);
  }

  public ngOnInit() {}

  public async changeImage(user): Promise<any> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Save Image from',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.cameraOptions.sourceType = 1;
            this.getPicture(this.cameraOptions, user);
          }
        },
        {
          text: 'Photo Library',
          handler: () => {
            this.cameraOptions.sourceType = 0;
            this.getPicture(this.cameraOptions, user);
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
  public save() {
    const userRef = this.afStore$.doc<IUser>(`users/${this.auth$.user.uid}`);
    userRef
      .set(this.user)
      .then(() => {
        this.toast('User Data Updated');
        this.closeModal();
      })
      .catch(() => this.toast('User update failed'));
  }

  /**
   * @description change contact image
   * @method getPicture
   * @param cameraOptions CameraOptions
   * @public
   * @returns void
   */
  public getPicture(cameraOptions: CameraOptions, user: IUser) {
    this.status = 'load';
    this.camera.getPicture(cameraOptions).then(
      (imageData) => {
        this.status = '';
        user.profileImage = 'data:image/jpeg;base64,' + imageData;
        this.uploadImageToFirebase(user.profileImage, user);
      },
      (error) => {
        this.status = 'error';
        this.toast(error);
      }
    );
  }

  private uploadImageToFirebase(image, user): void {
    this.status = 'load';
    this.uploadImage(
      image,
      user.uid.replace(' ', '_') + '-image',
      'profile'
    ).then((photoURL) => {
      user.profileImage = photoURL;
      this.toast('Image was updated successfully');
      this.status = '';
    });
  }
}
