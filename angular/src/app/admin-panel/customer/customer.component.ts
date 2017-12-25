import { Component, OnInit,Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService, CustomerService,AppService } from '../../_services/index';
import {NgbModal, NgbActiveModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { appConfig } from '../../app.config';

class Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  status: number;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

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
  customerList: Customer[] = []; // Table Data list
  customerAddForm: FormGroup;
  getCustomer = {
    id:'',
    name: '',
    email: '',
    phone: '',
    address: '',
    discount_percentage: '',
    status: '',
    gender: '',
    image:''
  };
  customerInfo = {};
  constructor(
            public router: Router,
            private http:Http,
            private dataService:CustomerService,
            private alertService: AlertService,
            private AppService:AppService,
            private modalService: NgbModal
          ) { }
  
  customer = {
    id:'',
    name: '',
    email: '',
    phone: '',
    address: '',
    discount_percentage: '',
    status: '',
    gender: '',
    image:''
  };
  setting = {currency:''};
  modalReference:NgbActiveModal;
  // customerinfo: ElementRef
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
    this.customerAddForm = new FormGroup({
      name : new FormControl("",Validators.compose([Validators.required])),
      email: new FormControl(""),
      phone: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      discount_percentage: new FormControl(""),
      status: new FormControl(""),
      gender: new FormControl("")
    });

    this.allCustomer();
    let settingData = JSON.parse(localStorage.getItem('setting'));
    this.setting = {currency:settingData.currency};
  }

  allCustomer(){
    this.dataService.getAllCustomer()
        .subscribe(data => { 
          this.customerList = data.customer; 
          this.dtTrigger.next(); // Data Table
          this.pdf = true;
          this.exl = true;
        });
  }


  
  edit(id,content){
    this.loadShow();
    this.DisplayedText = '';
    this.dataService.getCustomer(id)
        .subscribe(data => { this.getCustomer = data.customer; 
                  this.customer = {
                        id:this.getCustomer.id,
                        name:this.getCustomer.name,
                        email:this.getCustomer.email,
                        phone:this.getCustomer.phone,
                        address:this.getCustomer.address,
                        discount_percentage:this.getCustomer.discount_percentage,
                        status:this.getCustomer.status,
                        gender:this.getCustomer.gender,
                        image:this.getCustomer.image
                  };
                  this.loadHide();
                  this.modalTitle = 'Edit Customer';
                  this.modalReference = this.modalService.open(content);
              });
       

  }

  open(content) {
    this.loadShow();
    if (this.getCustomer.id !=null) {
      this.getCustomer.id='';
      this.getCustomer.image='';
    }
    this.DisplayedText = '';
    this.customer = {id:'',name: '',email: '',phone: '',address: '',discount_percentage: '',status: '1',gender: '',image:''};
    this.modalTitle = 'Add Customer';
    this.loadHide();
    this.modalReference = this.modalService.open(content);
  }

  save(val){
      this.insertAction(val);
  }

  

  openCustomerInfoMdal(id,customerinfo){
    this.loadShow();
    this.customerInfo = {image:''}; 
    this.dataService.getCustomerInfo(id)
        .subscribe(data => {
                    this.customerInfo = {
                      email:data.customer.email,
                      phone:data.customer.phone,
                      address:data.customer.address,
                      discount_percentage:data.customer.discount_percentage,
                      customerPurchase:data.purchase,
                      image: data.customer.image
                    };
                  });
        this.loadHide();

        this.modalReference = this.modalService.open(customerinfo,this.options);
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

    formData.append('name', this.customer.name);
    formData.append('phone', this.customer.phone);
    formData.append('email', this.customer.email);
    formData.append('address', this.customer.address);
    formData.append('discount_percentage', this.customer.discount_percentage);
    formData.append('status', this.customer.status);
    formData.append('gender', this.customer.gender);

    if(val.id==undefined || val.id==''){

      this.dataService.save(formData)
            .subscribe(data =>{
              this.dtTrigger = new Subject(); //  DataTable
              this.modalReference.close();
              this.alertService.success('Customer Create successful', true);
              this.allCustomer();
            },error =>{
              this.alertService.error(error);
            });
    }else{

      formData.append('id', val.id);
      this.dataService.customerUpdate(formData)
          .subscribe(data =>{
              this.dtTrigger = new Subject(); //  DataTable
              this.modalReference.close();
              this.alertService.success('Customer Update successful', true);
              this.allCustomer();
          },error =>{
            this.alertService.error(error);
          });
    }
    
  }

  pdfExport(){
     window.open(appConfig.apiUrl+"/api/customer-list-pdf", "_blank");
  }
  xlExport(){
     window.open(appConfig.apiUrl+"/api/customer-list-excel", "_blank");
  }
  
  loadShow(){
    this.showloding = true;
    this.lodingImage = false;
  }

  loadHide(){
    this.showloding = false;
    this.lodingImage = true;
  }

  salesInvoiceDetails(id){
    this.modalReference.close();
    this.router.navigate(['sales-invoice-details/' + id]);
  }

}
