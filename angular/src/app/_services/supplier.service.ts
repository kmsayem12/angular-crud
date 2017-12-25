import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class SupplierService {

  constructor(private http:Http) { }

  save(data){
  	return this.http.post('/api/supplier-save',data);

  }

  getAllSupplier(){
    return  this.http.get('/api/get-all-supplier').map((response: Response) => response.json());
  }

  getSupplier(id){
    return this.http.post('/api/get-supplier',{id:id}).map((response: Response) => response.json());
  }

  supplierUpdate(data){
    return this.http.post('/api/supplier-update',data);
  }
  
  getSupplierInfo(id){
    return this.http.post('/api/get-supplier-info',{id:id}).map((response: Response) => response.json());
  }

}
