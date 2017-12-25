import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService,SettingService } from './_services/index';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent { 

	constructor(
              private dataService:AppService,
              private setingService:SettingService,
              public router: Router
            ){ }

	getToken:string;
  	title = 'app';
	  getSetting = {
      id:'',
      company_name: '',
      address: '',
      phone: '',
      email: '',
      currency: '',
      vat_percentage: '',
      discount_percentage: '',
      image:''
    };

    setting = {};
  	ngOnInit() {
      this.settingData();
      // this.getToken = window.localStorage.getItem('currentUser');
      /*if(this.getToken==null) {
        this.router.navigate(['/login']);  
      }*/
   	}

  settingData(){
       // localStorage.removeItem('setting');
    this.setingService.getSettingData()
        .subscribe(data => { 
            this.getSetting = data.setting;
            this.setting = {
              id:this.getSetting.id,
              company_name:this.getSetting.company_name,
              address:this.getSetting.address,
              phone:this.getSetting.phone,
              email:this.getSetting.email,
              currency:this.getSetting.currency,
              vat_percentage:this.getSetting.vat_percentage,
              discount_percentage:this.getSetting.discount_percentage,
              image:this.getSetting.image
            }
            
            localStorage.setItem('setting', JSON.stringify(this.setting)); 
            let settingData = JSON.parse(localStorage.getItem('setting'));
        });
  }

  

}
