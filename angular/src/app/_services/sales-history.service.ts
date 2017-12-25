import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class SalesHistoryService {

  constructor(private http:Http) { }

  getAllsales(){
  	return this.http.get('/api/get-all-sales').map((response: Response) => response.json());
  }
 

}