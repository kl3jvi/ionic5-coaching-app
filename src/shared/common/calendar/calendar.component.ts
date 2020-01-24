import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import * as moment from 'moment';
import { Extender } from '../../helpers/extender';
import { IUser } from '../../models';
import { ICalendar } from './models/calendar.model';
import { DayStatus, IDay } from './models/day.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends Extender
  implements OnChanges, OnInit, OnDestroy {
  public get years(): number[] {
    const currentYear = moment(new Date())
      .add(10, 'years')
      .year();
    const years = [];
    let startYear = 2019;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  }
  public months = moment.months();
  public selectedMonth: number = new Date().getMonth();
  public selectedYear: number = new Date().getFullYear();
  public contact: IUser;
  public weekDays = moment.weekdays();
  public currentCalendar: ICalendar = new ICalendar(
    this.selectedYear,
    this.selectedMonth,
    []
  );
  public loading = false;
  public selectedDay: IDay;
  @Input() public items = null;
  @Output() private event: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected injector: Injector) {
    super(injector);
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'].previousValue !== changes['items'].currentValue) {
      this.currentCalendar = new ICalendar(
        this.selectedYear,
        this.selectedMonth,
        changes['items'].currentValue
      );
      this.selectedDay = this.currentCalendar.currentDay;
    }
  }

  public ngOnInit() {
    this.loading = true;

    this.currentCalendar = new ICalendar(
      this.selectedYear,
      this.selectedMonth,
      this.items || []
    );
    this.selectedDay = this.currentCalendar.currentDay;
    this.loading = false;
  }

  public getIsSettable(day: IDay) {
    if (day && day.date) {
      return (
        day.date.getTime() <
        new Date(
          moment()
            .subtract(1, 'day')
            .toDate()
        ).getTime()
      );
    }
    return false;
  }

  public getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
    const startRow = 2;
    const weekRow = Math.floor(index / 7);
    const firstWeekDayOfMonth = new Date(
      this.selectedYear,
      this.selectedMonth,
      1
    ).getDay();
    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

    return startRow + weekRow + irregularRow;
  }

  public onChangeStatus(day: IDay) {
    if (this.getIsSettable(day)) {
      return;
    }
    this.selectedDay = day;
    this.event.next();
  }

  public onUpdateState(selectedStatus: DayStatus) {
    if (selectedStatus === DayStatus.Open) {
      this.selectedDay = null;
      return;
    }
    this.selectedDay = null;
  }

  public ngOnDestroy() {}

  public changeMonth(value: number): void {
    if (value > 11) {
      value = 0;
    } else if (value < 0) {
      value = 11;
    }
    this.selectedMonth = value;
    this.currentCalendar = new ICalendar(
      this.selectedYear,
      this.selectedMonth,
      this.items || []
    );
  }

  public changeYear(value: number): void {
    this.selectedYear = value;
    this.currentCalendar = new ICalendar(
      this.selectedYear,
      this.selectedMonth,
      this.items || []
    );
  }
}
