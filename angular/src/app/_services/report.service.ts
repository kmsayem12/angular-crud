import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class ReportService {
    
    constructor(private http: Http) { }

    getReportData(data) {
        return this.http.post('/api/get-sales-report-data',data).map((response: Response) => response.json());
    }    
}