import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class ProductService {

  constructor(private http:Http) { }

  save(data){
    return this.http.post('/api/product-save', data);
  }

  getAllProduct(){
    return  this.http.get('/api/all-product').map((response: Response) => response.json());
  }

  getProduct(id){
    return this.http.post('/api/get-product-details',{id:id}).map((response: Response) => response.json());
  }

  getCategory()
  {
    return this.http.get('/api/get-all-category').map((response: Response) => response.json());
  }

  getSubCategory(id){
    return this.http.post('/api/get-cat-by-subCategory',{id:id}).map((response: Response) => response.json());
  }
  productUpdate(data){
    return this.http.post('/api/product-update',data);
  }

  getProductInfo(id){
    return this.http.post('/api/get-product-details',{id:id}).map((response: Response) => response.json());
  }

}
