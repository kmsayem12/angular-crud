import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService, ProductService,AppService } from '../../_services/index';
import $ from 'jquery/dist/jquery';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { appConfig } from '../../app.config';

class product {
  id: number;
  category: number;
  purchase_price: number;
  selling_price: number;
  sub_category: number;
  stock_quantity: number;
  damagedQuantity: number;
  name: string;
  status: number;
  note: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
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
  productList: product[] = []; // Table Data list
  productAddForm: FormGroup;
  randomnumber = Math.floor(Math.random() * 100000000);
  getProduct = {
    id:'',
    serial_number:'',
    name: '',
    category_id: '',
    sub_category_id: '',
    purchase_price: '',
    selling_price: '',
    note: '',
    status: '',
    image: ''
  };
  closeResult: string; // Modal Close
  productInfo = {};
  constructor(
              public router: Router,
              private http:Http,
              private dataService:ProductService,
              private alertService: AlertService,
              private AppService: AppService,
              private modalService: NgbModal
            ) { }

  product = {};
  modalReference:NgbActiveModal;
  modalTitle:string;
  cat = {};
  subCat:any[] = [];
  setting = {currency:''};
  showloding = true;
  lodingImage = false;
  ngOnInit() {

    setTimeout(() => {
            this.showloding = false;
            this.lodingImage = true;
        },500);
  	this.productAddForm = new FormGroup({
      serial_number : new FormControl(""),
      name : new FormControl("",Validators.compose([Validators.required])),
      category: new FormControl("", Validators.compose([Validators.required])),
      subCategory: new FormControl(""),
      purchase_price: new FormControl("", Validators.compose([Validators.required])),
      selling_price: new FormControl("", Validators.compose([Validators.required])),
      note: new FormControl(""),
      status: new FormControl(""),
    });

    // this.customer = {customer_code:this.randomnumber};

    this.allProduct();

    this.dataService.getCategory()
        .subscribe(data => { this.cat = data.cat;});
    let settingData = JSON.parse(localStorage.getItem('setting'));
    this.setting = {currency:settingData.currency};
  }

  allProduct(){
    this.dataService.getAllProduct()
        .subscribe(
          data => { this.productList = data.product; 
          this.dtTrigger.next(); // Data Table
          this.pdf = true;
          this.exl = true;
        });
  }

  selectCat(id){
    this.dataService.getSubCategory(id)
                    .subscribe(data => { 
                      this.subCat = data.subCat;
                    });
  }
  open(content) {

    if (this.getProduct.id !=null) {
      this.getProduct.id='';
    }

    this.randomnumber = Math.floor(Math.random() * 100000000);
    this.product = {
      serial_number:this.randomnumber,
      category:'',
      subCategory:'',
      status:'1',
      image:''
    } ;
    this.DisplayedText = '';
    this.modalTitle = "Add Product";
    this.modalReference = this.modalService.open(content);

  }

	save(val){
		this.insertAction(val);
	}

	edit(id,content){
    this.loadShow();
    this.DisplayedText = '';
    	this.dataService.getProduct(id)
          .subscribe(data => { this.getProduct = data.product; 
              let sub_category_id;
              if(this.getProduct.sub_category_id==null){
                sub_category_id ='';
              }else{
                sub_category_id = this.getProduct.sub_category_id
              }
              this.product = {
                    id:this.getProduct.id,
                    serial_number:this.getProduct.serial_number,
                    name:this.getProduct.name,
                    category:this.getProduct.category_id,
                    subCategory:sub_category_id,
                    purchase_price:this.getProduct.purchase_price,
                    selling_price:this.getProduct.selling_price,
                    note:this.getProduct.note,
                    status:this.getProduct.status,
                    image:this.getProduct.image
              };
              this.loadHide();
              this.modalTitle = "Edit Product";
              this.modalReference = this.modalService.open(content);
            });

	}

  openProductInfoMdal(id,customerinfo){
    this.loadShow();
    this.productInfo = {image:''};
    this.dataService.getProductInfo(id)
        .subscribe(data => {
                    this.productInfo = {
                      id:data.product.id,
                      serial_number:data.product.serial_number,
                      name:data.product.name,
                      category:data.product.categoryName,
                      subCategory:data.product.subCategoryName,
                      purchase_price:data.product.purchase_price,
                      selling_price:data.product.selling_price,
                      stock_quantity:data.product.stock_quantity,
                      note:data.product.note,
                      status:data.product.status,
                      image:data.product.image
                    };
                  });
          this.loadHide();
          this.modalReference = this.modalService.open(customerinfo);
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
    formData.append('serial_number', this.productAddForm.value.serial_number);
    formData.append('name', this.productAddForm.value.name);
    formData.append('category', this.productAddForm.value.category);
    formData.append('subCategory', this.productAddForm.value.subCategory);
    formData.append('purchase_price', this.productAddForm.value.purchase_price);
    formData.append('selling_price', this.productAddForm.value.selling_price);
    formData.append('note', this.productAddForm.value.note);
    formData.append('status', this.productAddForm.value.status);

    if(val.id==undefined){
      this.dataService.save(formData)
          .subscribe(data =>{
              this.modalReference.close();
              this.dtTrigger = new Subject(); //  DataTable
              this.allProduct();
              this.alertService.success('Product Create successful', true);
          },error =>{
            this.alertService.error(error);
          });
    }else{
      formData.append('id', val.id);
      this.dataService.productUpdate(formData)
          .subscribe(data =>{
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.allProduct();
            this.alertService.success('Product update successful', true);
          },error =>{
            this.alertService.error(error);
          });
    }
  }

  pdfExport(){
     window.open(appConfig.apiUrl+"/api/product-list-pdf", "_blank");
  }
  xlExport(){
     window.open(appConfig.apiUrl+"/api/product-list-excel", "_blank");
  }

  printTable() {
    /*var printContents = document.getElementById('table');
    var htmlToPrint = '' +
        '<style type="text/css">.action{display:none;}</style>';

      htmlToPrint += printContents.outerHTML;
      var popupWin = window.open('Print', '_blank');
      popupWin.document.open()
      popupWin.document.write('<html><head><link href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="print"></head><body onload="window.print()">' + htmlToPrint + '</html>');

      popupWin.document.close();
               popupWin.focus();*/
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
