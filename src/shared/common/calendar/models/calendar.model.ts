import { DayStatus, IDay } from './day.model';

export class ICalendar {
  constructor(
    public year: number,
    public month: number,
    public events: any[] = [],
    private _days: IDay[] = []
  ) {
    if (_days.length > 0) {
      return;
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i < daysInMonth + 1; i++) {
      const calEvents: any[] = [];
      const date = new Date(year, month, i);
      const dayInWeek = date.getDay();
      if (events) {
        events.forEach((eventItem) => {
          const _eventItem = Object.assign({}, eventItem);
          if (date.getDay() === new Date(eventItem.date).getDay()) {
            calEvents.push(_eventItem);
          }
        });
      }
      this._days.push({
        dayInMonth: i,
        dayInWeek,
        date,
        status: DayStatus.Open,
        events: calEvents.length > 0 ? calEvents : []
      });
    }
  }

  get currentDay() {
    return this._days.find((d) => d.dayInMonth === new Date().getDate());
  }

  get days() {
    return [...this._days];
  }
}
