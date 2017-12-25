import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService, SettingService,AppService } from '../../_services/index';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {
	settingAddForm: FormGroup;
	setting = {
	    id:'',
	    company_name: '',
	    address: '',
	    phone: '',
	    email: '',
	    currency: '',
      image:''
	 };

  @Input() allowMultiple: boolean;
  @Input() fileType: string;
  @Input() required: boolean;
  @Input() maxSizeInKb: number;
  @Output() onSelection = new EventEmitter<FileList>();
  DisplayedText: string = "";
  fileList:any;

	constructor(
            public router: Router,
            private http:Http,
            private dataService:SettingService,
            private alertService: AlertService,
            private AppService: AppService,
           ) { }
  showloding = true;
  lodingImage = false;
	ngOnInit() {
    
    setTimeout(() => {
            this.showloding = false;
            this.lodingImage = true;
        },500);
		this.settingAddForm = new FormGroup({
			  company_name: new FormControl("", Validators.compose([Validators.required])),
			  address: new FormControl("", Validators.compose([Validators.required])),
			  phone: new FormControl("", Validators.compose([Validators.required])),
			  email: new FormControl("", Validators.compose([Validators.required])),
			  currency: new FormControl("", Validators.compose([Validators.required]))
	    });
	    this.settingData();
	}

	settingData(){
    	this.dataService.getSettingData()
            .subscribe(data => { 
                        this.setting = {
                        	id:data.setting.id,
                        	company_name:data.setting.company_name,
                        	address:data.setting.address,
                        	phone:data.setting.phone,
                        	email:data.setting.email,
                        	currency:data.setting.currency,
                          image:data.setting.image
                        }
                        
                    });
    }  

    Update(){
      this.insertAction();

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

  insertAction(){
    let formData:FormData = new FormData();
    if(this.fileList !=undefined){
      let file: File = this.fileList[0];
      formData.append('file', file, file.name);
  }

  formData.append('company_name', this.setting.company_name);
  formData.append('phone', this.setting.phone);
  formData.append('email', this.setting.email);
  formData.append('address', this.setting.address);
  formData.append('currency', this.setting.currency);

  this.dataService.settingUpdate(formData)
          .subscribe(data =>{
            this.alertService.success('Setting Update successful', true);
            this.settingData();
          },error =>{
            this.alertService.error(error);
          });
  }
}
