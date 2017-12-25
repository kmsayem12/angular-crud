import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { AdminLayoutComponent } from './admin-panel/layouts/admin-layout.component';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/index';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
      {  path: 'dashboard',loadChildren: './admin-panel/dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard]},
      {  path: 'customer', loadChildren: './admin-panel/customer/customer.module#CustomerdModule',canActivate: [AuthGuard]},
      {  path: 'user', loadChildren: './admin-panel/user/user.module#UserModule',canActivate: [AuthGuard]},
      {  path: 'user-role/:id', loadChildren: './admin-panel/user/user-role/user-role.module#UserRoleModule',canActivate: [AuthGuard]},
      {  path: 'setting', loadChildren: './admin-panel/setting/setting.module#SettingModule',canActivate: [AuthGuard]},
      {  path: 'profile-settings', loadChildren: './admin-panel/profile-settings/profile-settings.module#ProfileSettingsModule',canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  },
  {
    path: '',
    component: WebLayoutComponent,
    data: {
      title: 'web'
    },
    children: [
      {path: 'home', loadChildren:'./web/home/home.module#HomeModule'}
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
