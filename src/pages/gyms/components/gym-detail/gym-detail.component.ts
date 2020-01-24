import {
  AfterContentInit,
  Component,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { map } from 'rxjs/internal/operators/map';
import { messages } from '../../../../assets/data/messages';
import { Extender } from '../../../../shared/helpers/extender';
import { IGym, ITrainer } from '../../../../shared/models';
declare var google;

@Component({
  selector: 'app-gym-detail',
  templateUrl: './gym-detail.component.html',
  styleUrls: ['./gym-detail.component.scss']
})
export class GymDetailComponent extends Extender
  implements OnInit, AfterContentInit {
  public gym: IGym = null;
  public map: any;
  public googlePlaces: any;
  public currentLocation: any;
  public imageIndex: number = 0;
  public msg: string;
  public trainers: ITrainer[] = [];
  public trainersRef: AngularFirestoreCollection<ITrainer>;
  public actions: Array<{ click: () => void; icon: string }> = [
    {
      icon: 'call',
      click: () => {
        this.call(this.gym);
      }
    },
    {
      icon: 'globe',
      click: () => {
        window.open(this.gym.website);
      }
    },
    {
      icon: 'timer',
      click: () => {
        this.scrollTo('open-times');
      }
    },
    {
      icon: 'people',
      click: () => {
        this.scrollTo('people');
      }
    },
    {
      icon: 'git-network',
      click: () => {
        this.share();
      }
    }
  ];
  @ViewChild('mapElement') public mapEelement;

  constructor(
    protected injector: Injector,
    private _socialShare: SocialSharing,
    private _callNumber: CallNumber,
    private geolocation: Geolocation
  ) {
    super(injector);
  }

  public ngAfterContentInit() {
    this.geolocation.getCurrentPosition().then((geo) => {
      this.currentLocation = geo;
      this.map = new google.maps.Map(this.mapEelement.nativeElement, {
        center: {
          lat: this.currentLocation.coords.latitude,
          lng: this.currentLocation.coords.longitude
        },
        zoom: 10
      });
      this.googlePlaces = new google.maps.places.PlacesService(this.map);
      this.getPlaceDetail(this.activatedRoute.snapshot.params.id);
    });
  }

  public ngOnInit() {
    this.msg = messages[Math.floor(Math.random() * messages.length)];
    this._getTrainers();
  }

  public share() {
    this._socialShare
      .share(
        this.gym.name.toString(),
        `Check out trainer ${this.gym.name}`,
        null,
        null
      )
      .catch((error) => this.toast(error));
  }

  public call(gym: IGym) {
    this._callNumber
      .callNumber(gym.formattedPhoneNumber, null)
      .catch((error) => this.toast(error));
  }

  private getPlaceDetail(placeId) {
    const request = {
      placeId,
      fields: [
        'name',
        'rating',
        'formatted_phone_number',
        'formatted_address',
        'opening_hours',
        'vicinity',
        'photo',
        'type',
        'website',
        'url',
        'review',
        'geometry'
      ]
    };

    this.status = 'load';

    this.googlePlaces = new google.maps.places.PlacesService(this.map);
    this.googlePlaces.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        place.images = this.getPhotos(place);
        this.gym = place;
        console.log(this.gym);
      }
      this.status = '';
    });
  }

  private getPhotos(place) {
    const photos = place.photos;
    if (!photos) {
      return;
    }
    const imageUrls = [];
    photos.forEach((image) => {
      imageUrls.push(image.getUrl({ maxWidth: 1600, maxHeight: 1350 }));
    });
    return imageUrls;
  }

  private scrollTo(item: string): void {
    const element = document.getElementById(item);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
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
        this.trainers = trainers;
      });
  }
}
