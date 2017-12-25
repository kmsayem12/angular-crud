import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class SettingService {
    
    constructor(private http: Http) { }

    getSettingData() {
        return this.http.get('/api/get-setting-data').map((response: Response) => response.json());
    }
    settingUpdate(data){
    	return this.http.post('/api/setting-data-update',data).map((response: Response) => response.json());
    }

    
}