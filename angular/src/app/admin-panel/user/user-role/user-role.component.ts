import { Component, OnInit,ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AlertService,UserRoleService } from '../../../_services/index';
import $ from 'jquery/dist/jquery';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

	constructor(
        public router: Router,
		public activatedRoute: ActivatedRoute,
        private http:Http,
        private alertService: AlertService,
        private dataService:UserRoleService,
        public elRef:ElementRef
		) { }
	showloding = true;
  	lodingImage = false;
  	menuList:any[]=[];
  	getRoleMenu:any;
  	getRoleSubMenu:any;
    setMenu = [];
    setSubMenu = [];
    urlParams:any;
		userName:string;
		userType:any;

    getUserRole = {
      menu:'',
      sub:'',
    }
	ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.urlParams = params['id'];
    });

		setTimeout(() => {
            this.showloding = false;
            this.lodingImage = true;
        },500);

        this.dataService.getRoleData().subscribe(data => {
	        this.menuList = data.data;
	    });

	    this.dataService.getUser(this.urlParams)
        	.subscribe(data => {
            this.userName = data.user.name;
            this.userType = data.user.type;

            if(data.roleData !=null){
              this.getUserRole = {
                menu:data.roleData.menu_id.split(","),
                sub:data.roleData.sub_menu_id.split(","),
              }
            }

            setTimeout(() => {
	        		this.getRoleMenu = this.getUserRole.menu; 
	        		this.getRoleSubMenu = this.getUserRole.sub; 
	        		for (let i = 0; i < this.getRoleMenu.length; ++i) {
	        			// let getid = this.elRef.nativeElement.querySelector('#menu-'+this.getRoleMenu[i]).checked = true;
	        			$('#menu-'+this.getRoleMenu[i]).attr('checked',true);
	        			this.setMenu.push(this.getRoleMenu[i]);
	        		}

	        		for (let i = 0; i < this.getRoleSubMenu.length; ++i) {
	        			// this.elRef.nativeElement.querySelector('#subMenu-'+this.getRoleSubMenu[i]).checked = true;
	        			$('#subMenu-'+this.getRoleSubMenu[i]).attr('checked',true);
	        			this.setSubMenu.push(this.getRoleSubMenu[i]);
	        		}

            	},500);

        	}
        );
	}


	selectMenu(event){
    	// console.log(event.target.value,event.target.classList);
    	let checkUniqueMenu = [];
		if(event.target.checked==true){
	    	this.setMenu.push(event.target.value);
	    	checkUniqueMenu =  Array.from(new Set(this.setMenu));
	    }else{
	    	this.setMenu.splice(this.setMenu.indexOf(event.target.value), 1);
	    	checkUniqueMenu =  Array.from(new Set(this.setMenu));
	    }
    }

	selectSubMenu(event){
		let checkUniqueSub = [];
	    if(event.target.checked==true){
	    	this.setSubMenu.push(event.target.value);
	    	checkUniqueSub =  Array.from(new Set(this.setSubMenu));
	    }else{
	    	this.setSubMenu.splice(this.setSubMenu.indexOf(event.target.value), 1);
	    	checkUniqueSub =  Array.from(new Set(this.setSubMenu));
	    }

	}

	update(){
		this.showloding = true;
    this.lodingImage = false;
		this.dataService.addUserRole(this.setMenu,this.setSubMenu,this.urlParams)
          .subscribe(data =>{
          	this.alertService.success('User Role Update successful', true);
          	this.showloding = false;
    			  this.lodingImage = true;
          },error =>{
            this.alertService.error(error);
          });
	}

	back(){
		this.router.navigate(['user']);
	}
}
