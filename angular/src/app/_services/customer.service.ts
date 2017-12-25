import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class CustomerService {

  constructor(private http:Http) { }


  save(data){
    return this.http.post('/api/customer-save', data);
  }

  getAllCustomer(){
    return this.http.get('/api/all-customer').map((response: Response) => response.json());
  }

  getCustomer(id){
 
    return this.http.post('/api/get-customer',{id:id}).map((response: Response) => response.json());
  }

  customerUpdate(data){
    return this.http.post('/api/customer-update',data);
  }

  getCustomerInfo(data){
    return this.http.post('/api/get-customer-info',{id:data}).map((response:Response) => response.json());
  }

}
