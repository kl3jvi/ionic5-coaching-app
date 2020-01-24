import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Extender } from '../../../../../shared/helpers/extender';
import { ICheckoutPayment } from '../shop-checkout.component';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent extends Extender implements OnInit {
  @Input() public input: ICheckoutPayment[];
  @Output() public output: EventEmitter<any> = new EventEmitter<any>();
  public cardImage: string;
  public model: ICheckoutPayment;
  public toggleAdd: boolean;
  @ViewChild('form') public form: NgForm;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
    this.model = {
      ccv: null,
      exp: null,
      name: this.auth$.user.fullname,
      number: null,
    };
  }

  public save() {
    if (this.form.valid) {
      this.afStore$
        .doc(`users/${this.auth$.user.uid}`)
        .collection('payments')
        .add(this.form.value)
        .then(() => {
          this.model = null;
          this.form.resetForm();
          this.toggleAdd = false;
        });
    } else {
      this.toast('Please complete the form');
    }
  }
}
