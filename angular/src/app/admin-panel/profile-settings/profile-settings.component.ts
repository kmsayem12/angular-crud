import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService, AppService } from '../../_services/index';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {
	profileAddForm: FormGroup;
	profile = {
	    id:'',
      name: '',
	    phone: '',
      email: '',
	    address: '',
      image:''
	};
	password = {
		id:'',
		currentPassword:'',
		newPassword:'',
		confirmPassword:''
	}
	@Input() allowMultiple: boolean;
	@Input() fileType: string;
	@Input() required: boolean;
	@Input() maxSizeInKb: number;
	@Output() onSelection = new EventEmitter<FileList>();
	DisplayedText: string = "";
	fileList:any;
	getToken:string;
  showloding = true;
  lodingImage = false;
	constructor(
              private dataService:AppService,
              private alertService: AlertService
             ) { }

	ngOnInit() {
 
    setTimeout(() => {
            this.showloding = false;
            this.lodingImage = true;
        },500);
		this.profileAddForm = new FormGroup({
        name: new FormControl("",Validators.compose([Validators.required])),
			  phone: new FormControl("",Validators.compose([Validators.required])),
        email: new FormControl(""),
			  address: new FormControl("",Validators.compose([Validators.required])),
			  currentPassword: new FormControl(""),
			  newPassword: new FormControl(""),
			  confirmPassword: new FormControl("")
	    });
	    this.profileData();
	}

	profileData(){
		this.getToken = window.localStorage.getItem('currentUser');
    	this.dataService.checkLogin(this.getToken)
            .subscribe(data => { 
                        this.profile = {
                        	id:data.user.id,
                          name:data.user.name,
                        	phone:data.user.phone,
                          email:data.user.email,
                        	address:data.user.address,
                          image:data.user.image
                        }
                        this.password.id = data.user.id;
                    });
    }  

    UpdateProfile(val){
      this.insertAction(val);

    }

    UpdatePassword(){
    	if(this.password.currentPassword==''){
    		this.alertService.error('Plase Type current Password');
    	}else if(this.password.newPassword==''){
    		this.alertService.error('Plase Type New Password');
    	}else if(this.password.confirmPassword==''){
    		this.alertService.error('Plase Type confirm Password');
    	}else if(this.password.newPassword != this.password.confirmPassword){
    		this.alertService.error('Confirm Password and New Password dont match');
    	}else{
	    	this.dataService.updatePassword(this.password)
			      .subscribe(data =>{
			      	if(data.status==500){
			      		this.alertService.error(data.mesg);
			      	}else{
				        this.alertService.success('Password Update successful', true);
				        this.profileData();
			      	}
			      },error =>{
			        this.alertService.error(error);
			      });
    	}
    }

    fileChange(event: any) {
      this.fileList = event.target.files;
      // let filetypeToCompare = this.fileType.replace('*','');
      let hasFile = this.fileList && this.fileList.length > 0;
      if (hasFile) {
          var extension = this.fileList[0].name.substring(this.fileList[0].name.lastIndexOf('.'));
          // Only process image files.
          var validFileType = ".jpg , .png , .bmp";
          if (validFileType.toLowerCase().indexOf(extension) < 0) {
              alert("please select valid file type. The supported file types are .jpg , .png , .bmp");
            this.fileList = null;
            this.DisplayedText = "";
            return false;
          }
          if (this.fileList[0].size > 65535) {
              alert(`File size is more than 65 Kb`);
              this.fileList = null;
              this.DisplayedText = "";
              return false;
          }
          let multipleFile = this.fileList.length > 1;
          if (multipleFile) {
              this.DisplayedText = this.fileList.length + ' file(s) has been selected';
          }
          else {
              let file: File = this.fileList[0];
              this.DisplayedText = file.name;
          }
          this.onSelection.emit(this.fileList);
      	}
    }

    insertAction(val){
    	let formData:FormData = new FormData();
    	if(this.fileList !=undefined){
      		let file: File = this.fileList[0];
      		formData.append('file', file, file.name);
      	}
      	if(val.id !=undefined){
      		formData.append('id', val.id);
      	}

    formData.append('name', this.profile.name);
    formData.append('phone', this.profile.phone);
		formData.append('address', this.profile.address);

		this.dataService.profileUpdate(formData)
		      .subscribe(data =>{
            if(data.status==200){
		          this.alertService.success('Profile Update successful', true);
		          this.profileData();
            }else if(data.status==300){
              this.alertService.error('User already exists', true);
            }
		      },error =>{
		        this.alertService.error(error);
		      });
  	}
}
