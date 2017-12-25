import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class PurchasesHistoryService {

  constructor(private http:Http) { }



  getAllPurchases(){
    return this.http.get('/api/get-all-purchases').map((response: Response) => response.json());
  }

  getPurchasesDetails(val){
    return this.http.post('/api/get-purchases-details',{purchase_code:val}).map((response: Response) => response.json());
  }
}