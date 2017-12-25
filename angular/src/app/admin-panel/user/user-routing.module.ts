import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
    { path: '', component: UserComponent,data: {title: 'Manage User'}  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }


/*import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserRoleComponent } from './user-role/user-role.component';

const routes: Routes = [
    {	path: '', data: {title: 'Manage User'},
	    children: [
	      {
	        path: 'user',
	        component: UserComponent,
	        data: {
	          title: 'Manage User'
	        }
	      },
	      {
	        path: 'user-role/:id',
	        component: UserRoleComponent,
	        data: {
	          title: 'Manage User Role'
	        }
	      }
	    ]
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }*/