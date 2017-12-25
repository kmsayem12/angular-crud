import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class DamagedProductService {

  constructor(private http:Http) { }

  save(data){
    return this.http.post('/api/damaged-product-save', data);
  }

  allDamagedProduct(){
    return  this.http.get('/api/all-damaged-product').map((response: Response) => response.json());
  }

  getAllProduct(type){
    return this.http.post('/api/get-all-product-by-damaged',{type:type}).map((response: Response) => response.json());
  }

  getDamagedProduct(id){
    return this.http.post('/api/get-damaged-product',{id:id}).map((response: Response) => response.json());
  }

  damagedProductUpdate(data){
    return this.http.post('/api/damaged-product-update',data);
  }

}
