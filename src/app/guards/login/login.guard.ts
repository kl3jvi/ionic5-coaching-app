import { Injectable, Injector } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Extender } from '../../../shared/helpers/extender';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard extends Extender implements CanActivate {
  constructor(protected injector: Injector) {
    super(injector);
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth$.user$.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.gotoPage(this.routes.auth);
        }
      })
    );
  }
}
