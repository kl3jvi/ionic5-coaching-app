export interface IGym {
  geometry: { location: { lat: number; lng: number } };
  images: string[];
  name: string;
  openingHours: { openNow: boolean };
  rating: number;
  types: string[];
  vicinity: string;
  distanceAway: number;
  color: string;
  formattedAddress: string;
  formattedPhoneNumber: string;
  reviews: GymReviewsModel[];
  website: string;
}

export interface GymReviewsModel {
  authorName: string;
  authorUrl: string;
  profilePhotoUrl: string;
  rating: number;
  relativeTimeDescription: string[];
  text: string;
}
