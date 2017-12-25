
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerService } from '../../_services/index';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CustomerRoutingModule,
        NgbModule,
        CommonModule, 
        ReactiveFormsModule,
        DataTablesModule
    ],
    declarations: [
        CustomerComponent
    ],
    providers: [CustomerService]
})
export class CustomerdModule { }