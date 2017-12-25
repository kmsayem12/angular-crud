import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';


import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SettingService } from '../../_services/index';


@NgModule({
    imports: [
        CommonModule,
        SettingRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        SettingComponent
    ],
    providers: [SettingService]
})
export class SettingModule { }