import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../_services/index';
@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {
  userData = {
    profileName:'',
    image:''
  }
  getToken:any;
  showDNClass: boolean = false;
  setting = {image:''};
  constructor(public router: Router,private dataService:AppService) { }
  nav:any;

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    setTimeout(() => {
        this.showDNClass = true;
    },20);

    this.getToken = window.localStorage.getItem('currentUser');
      this.dataService.checkLogin(this.getToken)
            .subscribe(data => { 
                if(data.user){
                  this.userData = {
                      profileName:data.user.name,
                      image:data.user.image,
                  }
                  
                }
            });
            let settingData = JSON.parse(localStorage.getItem('setting'));
            this.setting = {image:settingData.image};

        this.dataService.getMenu()
            .subscribe(data => { 
              this.nav = data.data;
            });
  }

  public logout(): void{
    // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
  }
}
