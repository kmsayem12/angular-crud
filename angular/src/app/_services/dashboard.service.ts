import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class DashboardService {

  constructor(private http:Http) { }

  totalCount(){
    return  this.http.get('/api/get-all-total-count').map((response: Response) => response.json());
  }

  getChartData(){
    return  this.http.get('/api/get-chart-data').map((response: Response) => response.json());
  }

  sumAllData(){
    return this.http.get('/api/get-all-dashboard-data').map((response: Response) => response.json());
  }

  getLastProduct(){
    return this.http.get('/api/get-latestProduct').map((response: Response) => response.json());
  }
}
