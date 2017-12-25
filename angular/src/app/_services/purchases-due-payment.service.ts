import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class PurchasesDuePaymentService {

  constructor(private http:Http) { }

  getInvoiceDetails(val){
    return this.http.post('/api/get-purchases-invoice-details',{id:val}).map((response: Response) => response.json());
  }
   
  paymentUpdate(data){
    return this.http.post('/api/purchases-payment-update',data).map((response: Response) => response.json());
  }

}
