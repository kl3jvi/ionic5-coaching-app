
export class CalendarOptions {
  display?: string;
  showEvents?: boolean;
  showEventDots?: boolean;
  navType?: string;
  isPage?: boolean;
  showMenu?: boolean;
}

export class CalendarEvent {
  id?: string;
  title?: string;
  start: string;
  end: string;
  start_time?: string;
  end_time?: string;
  color?: string;
  with: string;
  recurrence?: string;
  extras?: any;
}