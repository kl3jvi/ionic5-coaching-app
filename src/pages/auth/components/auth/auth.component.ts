import { Component, Injector, OnInit } from '@angular/core';
import { Extender } from '../../../../shared/helpers/extender';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends Extender implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {}

  public googleSignIn() {
    this.auth$
      .signInWithGoogle()
      .then(() => {
        this.gotoPage(this.routes.intro);
      })
      .finally(() => this.gotoPage(this.routes.intro))
      .catch((error) => this.toast(error.message));
  }

  public fbSignIn() {
    this.auth$
      .signInWithFacebook()
      .then(() => {
        this.gotoPage(this.routes.intro);
      })
      .finally(() => this.gotoPage(this.routes.intro))
      .catch((error) => this.toast(error.message));
  }
}
