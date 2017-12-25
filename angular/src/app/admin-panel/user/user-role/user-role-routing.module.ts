import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoleComponent } from './user-role.component';

const routes: Routes = [
    { path: '', component: UserRoleComponent,data: {title: 'Manage User Role'}  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleRoutingModule { }