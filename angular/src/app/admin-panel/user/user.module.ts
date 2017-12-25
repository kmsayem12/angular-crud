import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserService } from '../../_services/index';
// import  { UserDataService } from '../../service/employee/employee.data.service';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        DataTablesModule
    ],
    declarations: [
        UserComponent
    ],
    providers: [UserService]
})
export class UserModule { 

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserModule
        };
    }
}
