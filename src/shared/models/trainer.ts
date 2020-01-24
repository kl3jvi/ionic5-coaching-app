export interface ITrainer {
  id: string;
  fullname: string;
  address: string;
  skill: string;
  city: string;
  country: string;
  dob: Date | string;
  email: string;
  gender: string;
  gym: string;
  distanceAway?: number;
  location: { lat: number; lng: number };
  phone: string;
  picture: string;
  rating: number;
  reviewers: number;
  uid: string;
  reviews: ITrainerReviewer[];
  achievements: ITrainerAchievement[];
}

export interface ITrainerReviewer {
  date: Date | string;
  name: string;
  picture: string;
  rating: number;
  text: string;
}

export class ITrainerAchievement {
  public date: Date | string;
  public description: string;
  public title: string;
}
