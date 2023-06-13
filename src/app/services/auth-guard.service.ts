import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
        private router: Router
  ) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | any {

    if (sessionStorage['access-token'] != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
