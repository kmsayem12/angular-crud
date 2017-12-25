import { Injectable } from '@angular/core';
import {  Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AppService {

  constructor(private http:Http) { }

  checkLogin(token){
    let bodyString = token; // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    return  this.http.post('/api/get-user',bodyString, options)
            .map( (response) => response.json()
    );
  }

  profileUpdate(data)
  {
  	return this.http.post('/api/user-profileUpdate',data).map((response: Response) => response.json());
  }

  updatePassword(data)
  {
  	return this.http.post('/api/user-passwordUpdate',data).map((response: Response) => response.json());
  }

  getMenu() {
    return this.http.get('/api/get-all-menu').map((response: Response) => response.json());
  }

  checkPermission(val){
    return this.http.post('/api/check-user-permission',{menu:val}).map((response: Response) => response.json());
  }
}
