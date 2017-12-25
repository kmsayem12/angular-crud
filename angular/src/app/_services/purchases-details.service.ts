import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class PurchasesDetailsService {

  constructor(private http:Http) { }

  getPurchasesDetails(val){
    return this.http.post('/api/get-purchases-details',{id:val}).map((response: Response) => response.json());
  }
}