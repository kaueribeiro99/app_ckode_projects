import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly APIAuth: string = environment.apiBaseUrl + '/api/authenticate'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  authenticate(email: string, password: string):Promise<any>{
    return this.http.post(this.APIAuth, {email, password}).toPromise().catch();
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login']);
  }
}

