import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class SalesTakePaymentService {

  constructor(private http:Http) { }

  getInvoiceDetails(val){
    return this.http.post('/api/get-invoice-details',{id:val}).map((response: Response) => response.json());
  }
   
  takePayment(data){
    return this.http.post('/api/sales-take-payment',data).map((response: Response) => response.json());
  }

}


