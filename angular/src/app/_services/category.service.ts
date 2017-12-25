import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CategoryService {

  constructor(private http:Http) { }

  getToken = window.localStorage.getItem('token');


  save(data){
  	return this.http.post('/api/category-save', data);
  }

  getAllCategory(){
    return  this.http.get('/api/get-all-category-by-grid').map((response: Response) => response.json());
  }

  getCategory(id){
    return this.http.post('/api/get-category',{id:id}).map((response: Response) => response.json());
  }

  categoryUpdate(data){
    return this.http.post('/api/category-update',data);
  }

  categoryDelete(id){
    return this.http.post('/api/category-delete',{id:id});
  }
}
