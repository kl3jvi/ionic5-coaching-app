import {
  AfterContentInit,
  Component,
  Injector,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Extender } from '../../../../shared/helpers/extender';
import { IGym } from '../../../../shared/models';
import { GymFilterComponent } from '../gym-filter/gym-filter.component';
declare var google;

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  styleUrls: ['./gyms.component.scss']
})
export class GymsComponent extends Extender
  implements OnInit, AfterContentInit {
  public gyms: IGym[] = [];
  public showMap: boolean = true;
  public map: any;
  public googlePlaces: any;
  public currentLocation: any;
  public placeMarkers: any[] = [];
  public infoWindows: any[] = [];
  public filter: {
    radius: number;
    type?: string;
    openNow?: boolean;
    zoom: number;
  } = {
    radius: 5000,
    zoom: 8
  };
  @ViewChild('mapElement') public mapEelement;

  constructor(
    protected injector: Injector,
    private ngZone: NgZone,
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
      const marker = new google.maps.Marker({
        map: this.map,
        icon: { path: google.maps.SymbolPath.CIRCLE, scale: 5 },
        title: this.auth$.user ? this.auth$.user.fullname : 'Me',
        position: {
          lat: this.currentLocation.coords.latitude,
          lng: this.currentLocation.coords.longitude
        }
      });
      this.googlePlaces = new google.maps.places.PlacesService(this.map);
    });
  }

  public async ngOnInit() {
    this.currentLocation = await this.geolocation.getCurrentPosition();
  }

  public async openFilter() {
    const modal = await this.modalCtrl.create({
      component: GymFilterComponent,
      componentProps: { data: this.filter },
      cssClass: 'custom-modal'
    });
    modal.present();
    modal.onDidDismiss().then((filter: any) => {
      this.filter = filter.data;
    });
  }

  public searchPlaceOnMap(query) {
    const searchConf = {
      name: query,
      radius: this.filter.radius,
      zoom: this.filter.zoom || 8,
      type: this.filter.type,
      openNow: this.filter.openNow,
      location: new google.maps.LatLng(
        this.currentLocation.coords.latitude,
        this.currentLocation.coords.longitude
      )
    };

    if (query && query.trim() !== '') {
      this.status = 'load';
      this.googlePlaces.nearbySearch(searchConf, (predictions, status) => {
        this.gyms = [];
        this.removeMarkers();
        this.ngZone.run(() => {
          predictions.forEach((prediction) => {
            prediction.images = this.getPhotos(prediction);
            this.gyms.push(prediction);
            this.addMarker(prediction);
          });
        });
        console.log(this.gyms[0]);
        this.status = '';
      });
    } else {
      this.gyms = [];
      this.removeMarkers();
      return;
    }
  }

  public getPhotos(place) {
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

  public addMarker(place) {
    this.infoWindows.push(this.infoWindow(place));

    this.placeMarkers.push(
      new google.maps.Marker({
        map: this.map,
        title: place.name,
        place: {
          placeId: place.place_id,
          location: place.geometry.location
        }
      })
    );
    this.placeMarkers.forEach((item, index) => {
      item.addListener('click', () => {
        this.infoWindows[index].open(this.map, item);
      });

      this.infoWindows[index].addListener('click', (marker, i) => {
        console.log('clicked');
      });
    });
  }

  public removeMarkers() {
    if (this.placeMarkers && this.placeMarkers.length > 0) {
      this.placeMarkers.forEach((marker) => {
        marker.setMap(null);
      });
    }
  }

  public infoWindow(place) {
    const contentString = `
      <h2>${place.name}</h2>
      <p>${place.vicinity}</p>
      <a href="${this.routes.gyms}/${place['place_id']}">Open</a>
    `;
    return new google.maps.InfoWindow({
      content: contentString,
      enableEventPropagation: true
    });
  }

  public open(place) {
    this.gotoPage(this.routes.gyms + '/' + place['place_id']);
  }
}
