import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class PurchaseService {

  constructor(private http:Http) { }

  save(data){
  	return this.http.post('/api/product-save', data);
  }

  getAllSupplier(){
    return this.http.get('/api/get-all-supplier-by-purchases').map((response: Response) => response.json());
  }

  getAllProduct()
  {
    return this.http.get('/api/get-all-purchasesProduct').map((response) => response.json());
  }

  getCategoryByPurchases(id){
    return this.http.post('/api/get-productForPurchases',{productId:id}).map((response: Response) => response.json());
  }

  createNewPurchase(data){
    return this.http.post('/api/create-new-purchase',data).map((response: Response) => response.json());
  }
}