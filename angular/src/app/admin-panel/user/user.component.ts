import { Component, OnInit,Input,Output,EventEmitter,ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService, UserService,AppService } from '../../_services/index';
import {NgbModal, NgbActiveModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { appConfig } from '../../app.config';



class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: number;
  status: number;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  @Input() allowMultiple: boolean;
  @Input() fileType: string;
  @Input() required: boolean;
  @Input() maxSizeInKb: number;
  @Output() onSelection = new EventEmitter<FileList>();
  DisplayedText: string = "";
  fileList:any;
  pdf = false;
  exl = false;
	dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
	userList: User[] = []; // Table Data list
  userAddForm :FormGroup;
  getUser = {
	  id: '',
	  name: '',
	  email: '',
	  phone: '',
    address: '',
    password: '',
    type: '',
    status: '',
    image:''
	};
  userType = [{id:1,name:'Admin'},{id:2,name:'user'}]; 
  constructor(
            public router: Router,
            private http:Http,
            private dataService:UserService,
            private alertService: AlertService,
            private AppService: AppService,
            private modalService: NgbModal,
            private elementRef : ElementRef
          ) { }
  user = {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    type: '',
    status: '',
    image:''
  };
  modalReference:NgbActiveModal;
  options: NgbModalOptions = {size: 'lg'};
  modalTitle:string;
  showloding = true;
  lodingImage = false;

	ngOnInit() {
    setTimeout(() => {
            this.showloding = false;
            this.lodingImage = true;
        },500);

    // form validaion
    this.userAddForm = new FormGroup({
      name : new FormControl("",Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required])),
      phone: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl(""),
      password: new FormControl(""),
      type: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl(""),
    });

    this.allUser();
	}

  allUser(){
    this.dataService.getAlluser()
                    .subscribe(data => { 
                      this.userList = data.user; 
                      this.dtTrigger.next(); // Data Table
                      this.pdf = true;
                      this.exl = true;
                    });
  }
  save(val){
    this.insertAction(val);
  }

  viewUserPermission(id){
    this.router.navigate(['user-role/' + id]);
  }

  edit(id,content){
    this.loadHide();
    this.modalTitle = "Edit User";

    this.dataService.getUser(id)
        .subscribe(data => { this.getUser = data.user; 

              this.user = {
                    id:this.getUser.id,
                    name:this.getUser.name,
                    email:this.getUser.email,
                    phone:this.getUser.phone,
                    address:this.getUser.address,
                    password:'',
                    type:this.getUser.type,
                    status:this.getUser.status,
                    image:this.getUser.image
              };
              
              this.modalReference = this.modalService.open(content);
          });

  }

  open(content) {
    this.DisplayedText = '';
    this.user = {id: '',name: '',email: '',phone: '',address: '',password: '',type: '',status: '0',image:''};
    this.modalTitle = "Add User";
    this.modalReference = this.modalService.open(content);
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
     
          if (this.fileList[0].size > 165535) {
              alert(`File size is more than 165 Kb`);
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
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('phone', this.user.phone);
    formData.append('address', this.user.address);
    formData.append('password', this.user.password);
    formData.append('type', this.user.type);
    formData.append('status', this.user.status);

    if(val.id==undefined || val.id==''){
      this.dataService.save(formData)
          .subscribe(data =>{
              if(data.status==200){
                this.modalReference.close();
                this.dtTrigger = new Subject(); //  DataTable
                this.allUser();
                this.alertService.success('User Create successful', true);
              }else if(data.status==300){
                this.alertService.success('User already exists', true);
              }
          },error =>{
            this.alertService.error(error);
          });
    }else{
      formData.append('id', val.id);
      this.dataService.userUpdate(formData)
          .subscribe(data =>{
            if(data.status==200){
              this.modalReference.close();
              this.dtTrigger = new Subject(); //  DataTable
              this.allUser();
              this.alertService.success('User Update successful', true);
            }else if(data.status==300){
              this.alertService.error('User already exists', true);
            }
          },error =>{
            this.alertService.error(error);
          });
    }
  }

  delete(id){
    this.dataService.userDelete(id)
          .subscribe(data =>{
              this.dtTrigger = new Subject(); //  DataTable
              this.allUser();
              this.alertService.success('User Delete successful', true);
          },error =>{
            this.alertService.error(error);
          });
  }

  pdfExport(){
     window.open(appConfig.apiUrl+"/api/user-list-pdf", "_blank");
  }
  xlExport(){
     window.open(appConfig.apiUrl+"/api/user-list-excel", "_blank");
  }
  
  loadShow(){
    this.showloding = true;
    this.lodingImage = false;
  }

  loadHide(){
    this.showloding = false;
    this.lodingImage = true;
  }
}
