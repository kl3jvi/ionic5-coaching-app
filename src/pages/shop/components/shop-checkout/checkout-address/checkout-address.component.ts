import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../../../../shared/common/services/common/common.service';
import { Extender } from '../../../../../shared/helpers/extender';
import { ICheckoutAddress } from '../shop-checkout.component';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent extends Extender implements OnInit {
  @Input() public type: string;
  @Input() public input: ICheckoutAddress[];
  @Output() public output: EventEmitter<any> = new EventEmitter<any>();
  public countries: any;
  public countrySelectOptions = {
    header: 'Select Country',
  };
  public model: ICheckoutAddress;
  public toggleAdd: boolean;
  @ViewChild('form') public form: NgForm;

  constructor(protected injector: Injector, private commonService: CommonService) {
    super(injector);
  }

  public ngOnInit() {
    this.model = {
      type: this.type,
      addressline1: this.auth$.user.address || '',
      addressline2: '',
      city: this.auth$.user.city || '',
      country: this.auth$.user.country || '',
      postcode: '',
    };
    this.commonService.getCountries().subscribe((countries) => (this.countries = countries));
  }

  public save() {
    if (this.form.valid) {
      this.afStore$
        .doc(`users/${this.auth$.user.uid}`)
        .collection('addresses')
        .add(this.model)
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
