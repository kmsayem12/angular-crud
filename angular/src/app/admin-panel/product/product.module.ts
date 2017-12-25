import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductService } from '../../_services/index';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        ProductRoutingModule,
        ReactiveFormsModule,
        DataTablesModule
    ],
    declarations: [
        ProductComponent
    ],
    providers: [ProductService]
})
export class ProductModule { }
