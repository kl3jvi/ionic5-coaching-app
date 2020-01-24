import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  /**
   * @description stores rate information
   * @property rate
   * @type number
   * @public
   */
  @Input() public rate: number;

  /**
   * @description changes rating color
   * @property color
   * @type string
   * @public
   * @default 'primary'
   */
  @Input() public color: string = 'primary';

  /**
   * @description emit change event
   * @property updateRate
   * @type EventEmitter<any>
   * @public
   * @default new EventEmitter<any>()
   */
  @Output() public updateRate: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @description stores range for rating
   * @property range
   * @type number[]
   * @public
   * @default [1, 2, 3, 4, 5]
   */
  public range: number[] = [1, 2, 3, 4, 5];

  /**
   * @description update rate and emit updated value
   * @method update
   * @param value {number}
   * @public
   * @returns void
   */
  public update(value: number): void {
    this.rate = value;
    this.updateRate.emit(value);
  }
}
