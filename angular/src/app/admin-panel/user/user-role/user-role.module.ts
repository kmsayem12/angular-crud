import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';


import { UserRoleRoutingModule } from './user-role-routing.module';
import { UserRoleComponent } from './user-role.component';
import { UserRoleService } from '../../../_services/index';


@NgModule({
    imports: [
        CommonModule,
        UserRoleRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        UserRoleComponent
    ],
    providers: [UserRoleService]
})
export class UserRoleModule { }