import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

// import {ChartModule} from 'primeng/primeng';
import { DashboardService } from '../../_services/index';

@NgModule({
  imports: [
  	CommonModule,
    DashboardRoutingModule
  ],
  declarations: [ DashboardComponent ],
  providers: [DashboardService]
})
export class DashboardModule { }
