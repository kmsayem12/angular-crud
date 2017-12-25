import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class SubCategoryService {

  constructor(private http:Http) { }

  save(data){
  	return this.http.post('/api/subCategory-save',data);
  }

  getAllSubCategory(){
    return  this.http.get('/api/get-subCategoryGridData').map((response: Response) => response.json());
  }

  getCategory()
  {
    return this.http.get('/api/get-all-category').map((response: Response) => response.json());
  }


  getSubCategory(id){
    return this.http.post('/api/get-subCategory',{id:id}).map( (response) => response.json());
  }
  subCategoryUpdate(data){
    return this.http.post('/api/subCategory-update',data);
  }

  subCategoryDelete(id){
     return this.http.post('/api/subCategory-delete',{id:id});
  }

}
