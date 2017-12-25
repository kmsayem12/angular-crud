import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
// import  { AuthenticationService } from '../service/authentication/authentication.data.service';
import { AlertService, AuthenticationService, SettingService} from '../_services/index';
import { Subject } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import $ from 'jquery/dist/jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
            private route: ActivatedRoute,
            public router: Router,
            private http:Http,
            private dataService:AuthenticationService,
            private setingService:SettingService,
            private alertService: AlertService
          ) { }
    username: string;
    password: string;
    token:string;
    textMesg:any;
    show: boolean = false;

    model: any = {};
    loading = false;
    returnUrl: string;
    setting = {image:''};
    ngOnInit() { 
      if (localStorage.getItem('currentUser')) {
        this.router.navigate(['/dashboard']);
      }
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      this.setingService.getSettingData()
            .subscribe(data => { 
                        this.setting = {image:data.setting.image}                        
            });
    }

   
    onLoggedin() {
    	this.loading = true;
	    
      var UserInput = {
        	'email': this.model.username,
	    	'password': this.model.password
	    };
      
      if(this.model.username !=undefined  && this.model.password != undefined){

	      this.dataService.login(UserInput)
	          .subscribe(
	              data => {
	                  if(data.status==400){
	                  	this.show = true;
	                  	this.textMesg = data.mesg;
	                    this.loading = false;
                    }else if(data.status==500){
                      this.show = true;
                      this.textMesg = data.mesg;
                      this.loading = false;
                    }else if(data.status==300){
                      this.show = true;
                      this.textMesg = data.mesg;
                      this.loading = false;
	                  }else{
						          this.router.navigate([this.returnUrl]);
	                  }
	              },
	              error => {
	                  this.alertService.error(error);
	              });
      }
    
  }

}
