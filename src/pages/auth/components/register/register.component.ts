import { Component, Injector, OnInit } from '@angular/core';
import { Extender } from '../../../../shared/helpers/extender';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends Extender implements OnInit {
  public model: {
    fullname: string;
    email: string;
    password: string;
    rpassword: string;
  } = {
    fullname: null,
    email: '',
    password: '',
    rpassword: null,
  };
  public passwordStrength: string;

  constructor(protected injector: Injector, private _auth$: AuthService) {
    super(injector);
  }

  public ngOnInit() {}

  /**
   * register a new user
   */
  public signup(): void {
    this.loading = true;
    this._auth$
      .signUp(this.model)
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
