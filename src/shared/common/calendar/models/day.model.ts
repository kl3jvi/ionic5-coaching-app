export enum DayStatus {
  Open,
  Completed,
  Failed
}

export interface IDay {
  dayInMonth: number;
  dayInWeek: number;
  date: Date;
  status: DayStatus;
  events: any[];
}
