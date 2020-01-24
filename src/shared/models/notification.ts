import { IBlog } from './blog';
import { IGym } from './gym';
import { ITrainer } from './trainer';

export interface INotification {
  type: string;
  context?: IGym | ITrainer | IBlog | any;
  title: string;
  subtitle?: string;
  images?: string[];
  icon?: string;
  description: string;
  date: string;
  start: string;
  end: string;
}
