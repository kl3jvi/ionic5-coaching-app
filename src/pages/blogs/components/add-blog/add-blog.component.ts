import { Component, Injector, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavParams } from '@ionic/angular';
import { forkJoin, Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Extender } from '../../../../shared/helpers/extender';
import { IBlog } from '../../../../shared/models';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent extends Extender implements OnInit {
  public post: IBlog | any = null;
  public images: any[] = [];
  public cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  public imageFilesToUploads: any[] = [];
  public model: any;

  constructor(
    protected injector: Injector,
    private _navParams: NavParams,
    private camera: Camera
  ) {
    super(injector);
  }

  public ngOnInit() {
    this.post = this._navParams.get('data');
    if (!this.post) {
      this.post = {
        title: null,
        type: this._navParams.get('type'),
        content: null
      };
    }

    this.auth$.user$.subscribe((user: any) => {
      this.post.uid = user.uid;
      this.post.user = {
        fullname: user.fullname,
        picture: user.profileImage
      };
    });
  }

  public async addImages(): Promise<any> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Save Image from',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.cameraOptions.sourceType = 1;
            this.takePicture(this.cameraOptions);
          }
        },
        {
          text: 'Photo Library',
          handler: () => {
            this.cameraOptions.sourceType = 0;
            this.takePicture(this.cameraOptions);
          }
        },
        {
          text: 'Multiple Photo Library',
          handler: () => {
            this.getPicturesFromLibrary(5);
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

  public uploadImagesToFirebase(): Observable<any> {
    if (this.imageFilesToUploads.length > 0) {
      return forkJoin(this.imageFilesToUploads);
    }
    return of(null);
  }

  public savePost(): void {
    this.uploadImagesToFirebase().subscribe((results) => {
      this.post.images = results;
      this.post.type = 'diet';
      this.post.created_at = new Date().toISOString();
      this.afStore$.collection('blogs').add(this.post);
      this.closeModal();
    });
  }

  /**
   * @description take picture from your devices camera using the camera plugin,
   * add result to images property to display how many on screen and in preview
   * store upload functions for each image in an array 'imageFilesToUploads' to use at save
   * @method takePicture
   * @param max
   */
  private takePicture(cameraOptions: any) {
    this.camera.getPicture(cameraOptions).then(
      (imageData) => {
        imageData = 'data:image/jpeg;base64,' + imageData;
        this.images.push(imageData);
        this.imageFilesToUploads.push(
          this.uploadImage(imageData, `${uuid()}.jpg`, 'blog-images')
        );
      },
      (error) => {
        this.status = 'error';
        this.toast(error);
      }
    );
  }

  /**
   * @description get pictures from your devices library using the image picker plugin,
   * add results to images property to display how many on screen and in preview
   * store upload functions for each image in an array 'imageFilesToUploads' to use at save
   * @method getPicturesFromLibrary
   * @param max
   */
  private getPicturesFromLibrary(max): void {
    this.getPictures(max).then((results) => {
      if (results && results.length > 0) {
        this.images = [...results];
        results
          .forEach((imageUrl: any) => {
            this.imageFilesToUploads.push(
              this.uploadImage(imageUrl, `${uuid()}.jpg`, 'blog-images')
            );
          })
          .catch((error: any) => {
            this.toast(error);
          });
      }
    });
  }
}
