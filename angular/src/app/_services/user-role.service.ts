import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
@Injectable()
export class UserRoleService {

  constructor(private http:Http) { }

  getUser(id){
    return this.http.post('/api/user-assing-role-data',{id:id}).map((response: Response) => response.json());
  }
  
  getRoleData() {
    return this.http.get('/api/user-role-data').map((response: Response) => response.json());
  }

  addUserRole(menu,submenu,user_id){
    return this.http.post('/api/add-user-role',{menu:menu,subMenu:submenu,userId:user_id});
  }
}
