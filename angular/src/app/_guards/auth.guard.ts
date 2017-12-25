import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService,AlertService } from '../_services/index';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
                private router: Router,
                private AppService: AppService,
                private alertService: AlertService,
            ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        this.alertService.alertClose();
        let url = state.url.split("/")[1];
        let getToken = localStorage.getItem('currentUser');
        this.AppService.checkLogin(getToken)
              .subscribe(data => { 
                  console.log(data.status); 
                if(data.status !=200){
                    window.localStorage.removeItem('currentUser');
                    this.router.navigate(['/login']); 
                }
        });
              
        if (localStorage.getItem('currentUser')) {

            this.AppService.checkPermission(url)
            .subscribe(data => { 
              if(data.count==0){
                this.router.navigate(['/dashboard']);
              } 
            });
            
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}