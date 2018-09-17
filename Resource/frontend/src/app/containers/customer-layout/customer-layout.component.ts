import { Component, Input, OnInit } from '@angular/core';
import { navItems } from './../../_nav';
import { AuthenticationService } from '../../service/authentication.service';
import { setOffsetToUTC } from 'ngx-bootstrap/chronos/units/offset';

@Component({
  selector: 'app-dashboard',
  templateUrl: './customer-layout.component.html'
})
export class CustomerLayoutComponent implements OnInit {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  customerProfile: any;
  constructor(private authenticationService: AuthenticationService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    document.body.classList.remove('sidebar-fixed');
    this.authenticationService.getProfile().subscribe(data => {
      if (data != null && this.authenticationService.isStaff==false) {
        this.customerProfile = data;
      }else{
        localStorage.clear();
        this.authenticationService.logout();
      }
    })
  }
}
