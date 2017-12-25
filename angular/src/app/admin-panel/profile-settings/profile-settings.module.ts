import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProfileSettingsComponentRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings.component';
import { AppService } from '../../_services/index';



@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        ProfileSettingsComponentRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProfileSettingsComponent
    ],
    providers: [AppService]
})
export class ProfileSettingsModule { }