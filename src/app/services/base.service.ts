import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  APIUrl: string = environment.apiBaseUrl;
  key!: string;

  constructor(
      protected http: HttpClient
  ) { }

  get url(): string {
    return `${this.APIUrl}/${this.key}`;
  }

  async header(): Promise<HttpHeaders> {
    let token: any = sessionStorage.getItem('access-token');
    let refresh: any = sessionStorage.getItem('refresh-token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'refresh': refresh,
    })
  }

  async create(item:object):Promise<any> {
    let headers = await this.header()
    return this.http.post<any>(`${this.url}`,item, {headers: headers}).toPromise().catch((error) => {console.log(error)});
  }

  async update(id: number, item: object):Promise<any> {
    let headers = await this.header()
    return this.http.put<any>(`${this.url}/` + id, item, {headers: headers}).toPromise().catch((error) => {console.log(error)});
  }

  async list():Promise<any> {
    let headers = await this.header();
    return this.http.get<any>(`${this.url}`, { headers: headers }).toPromise().catch((error) => { console.log(error); });
  }

  async delete(id: number):Promise<any> {
    let headers = await this.header()
    return this.http.delete<any>(`${this.url}/` + id, {headers: headers}).toPromise().catch((error) => {console.log(error)});
  }

}
