import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Extender } from '../../../../../shared/helpers/extender';

@Component({
  selector: 'app-checkout-personal',
  templateUrl: './checkout-personal.component.html',
  styleUrls: ['./checkout-personal.component.scss']
})
export class CheckoutPersonalComponent extends Extender implements OnInit {
  @Input() public input: any;
  @Output() public output: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {}
}
