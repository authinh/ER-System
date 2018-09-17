import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(authenticationService: AuthenticationService) {
    
    authenticationService.getProfile().subscribe((profile) => {
      let role = 'CUSTOMER';
      if (profile.role) role = profile.role.name;
      this.navItems = navItems.filter((item: any) => {
        document.body.classList.remove('sidebar-fixed');
        if (item.roles != null) {
          return item.roles.indexOf(role) > -1
        }
        return true;
      });
    })

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
}
