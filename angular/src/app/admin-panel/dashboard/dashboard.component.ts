import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService,SettingService, AlertService } from '../../_services/index';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels:any[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  // dropdown buttons
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  data: any;
  customerPayment = {};
  sales = {count:'',total:''};
  payment = {count:'',total:''};
  expense = {count:'',total:''};
  setting = {currency:''};
  totalCount = {
    product:'',
    damaged_product:'',
    customer:'',
    supplier:'',
    user:'',
    category:''
  }

  lastProduct:any;
  lastOrder:any;
  showloding = true;
  lodingImage = false;
  constructor(
              private dataService:DashboardService,
              private settingService:SettingService,
              private alertService: AlertService,
            ) { }

  barChartData:any=[];
  ngOnInit() {
    
    setTimeout(() => {
            this.showloding = false;
            this.lodingImage = true;
        },500);

      this.dataService.totalCount()
          .subscribe(data => { 
              this.totalCount ={
                product:data.product.count,
                damaged_product:data.damaged_product.count,
                supplier:data.supplier.count,
                user:data.user.count,
                customer:data.customer.count,
                category:data.category.count
              } 
          });


      this.dataService.sumAllData()
          .subscribe(data => { 
            this.sales = {
              count:data.sales.count,
              total:data.sales.total
            }
            this.payment = {
              count:data.payment.count,
              total:data.payment.total
            }
            this.expense = {
              count:data.expense.count,
              total:data.expense.total
            }
          });

      this.dataService.getLastProduct()
          .subscribe(data => { 
            this.lastProduct = data.product
          });

      let settingData = JSON.parse(localStorage.getItem('setting'));
      this.setting = {currency:settingData.currency};

  }

  
}
