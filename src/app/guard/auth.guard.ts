import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService, private router: Router) { }
  canActivate(): boolean {
    let value = this.auth.isAuthenticated();
    if (!value) {
      this.router.navigate(["/login"]);
    }
    return value;
  }
}
