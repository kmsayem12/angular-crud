import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class SalesService {

  constructor(private http:Http) { }

  getAllCustomer(){
  	return this.http.get('/api/all-customer-list').map((response: Response) => response.json());
  }
  getCustomerDiscount(id){
  	return this.http.post('/api/get-customer-by-discount',{id:id}).map((response: Response) => response.json());
  }
  getAllCategory(){
  	return this.http.get('/api/get-all-category').map((response: Response) => response.json());
  }
  
  getSubCategory(id){
    return this.http.post('/api/get-cat-by-subCategory',{id:id}).map((response: Response) => response.json());
  }

  getCategoryByProduct(type,id){

    return this.http.post('/api/get-categoryByProduct',{cat:id,type:type}).map((response: Response) => response.json());
  }

  getProductInfo(id){
    return this.http.post('/api/get-product-info',{id:id}).map((response: Response) => response.json());
  }

  createSales(data){
  	return this.http.post('/api/create-new-sales',data).map((response: Response) => response.json());
  }

}