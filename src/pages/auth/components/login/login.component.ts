import { Component, Injector, OnInit } from '@angular/core';
import { Extender } from '../../../../shared/helpers/extender';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Extender implements OnInit {
  public model: { email: string; password: string } = {
    email: '',
    password: '',
  };

  constructor(protected injector: Injector, private _auth$: AuthService) {
    super(injector);
  }

  public ngOnInit() {}

  /**
   * submit email and password to call endpoint to do firebase email login
   */
  public login(): void {
    if (!this.model.email) {
      return;
    }
    this.loading = true;

    this._auth$
      .signInWithEmail(this.model)
      .then(() => {
        this.loading = false;
        this.gotoPage(this.routes.intro);
      })
      .catch((error) => {
        this.toast(error.message);
        this.loading = false;
      });
  }
}
