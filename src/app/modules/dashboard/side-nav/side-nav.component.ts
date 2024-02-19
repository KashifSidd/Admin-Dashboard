import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allowedRouteAccessTo, permissionDeniedErrorMsg, redirectConfig, Services } from 'src/app/shared/models/constants/constant.type';
import { INavLink, navLinks, ServiceDisplayName } from './model/side-nav';
import { SharedService } from 'src/app/shared/services/shared.service';
import { originalOrder } from 'src/app/shared/functions/modular.functions';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  showDataDumpSubmenu: boolean;
  showOrdersSubMenu: boolean;
  showUserProfile: boolean;
  role: string;
  service: string;
  readonly serviceDisplayName = ServiceDisplayName;
  readonly originalOrder = originalOrder;
  showSubMenu = {};
  navLinks: INavLink[];
  // isSideNavOpen: boolean;
  isServicesMenuOpen: boolean;

  constructor(private router: Router, private sharedService: SharedService, private toastMsgService: ToastService) { }

  ngOnInit() {
    this.sharedService.isServiceChanged$.subscribe(data => {
      this.service = this.sharedService.service;
      this.setNavLinks();
    });
    // this.sharedService.isSideNavOpen$.subscribe(data => this.isSideNavOpen = data);
  }

  /**
   * Method that updates service based on selection
   * @param service 
   */
  serviceSelectionChange(service: Services) {
    this.sharedService.setService(service);
    // window.location.reload();
    this.router.navigate([`${service}/${this.redirectRoute}`]);
    this.showSubMenu = {};
  }

  /**
   * Method that navigates to grafana
   */
  navigateToGrafanaDashboard() {
    if (!this.sharedService.hasEditAccessForOutletDetails) return this.toastMsgService.showInfo(permissionDeniedErrorMsg);
    const link = this.router.serializeUrl(this.router.createUrlTree([''], { 
      queryParams: { auth_token: localStorage.getItem('token') }
    }))
    window.open(`${environment.grafanaDashboardBaseUrl}${link}`);
  }

  get redirectRoute() {
    return redirectConfig[this.sharedService.service][this.sharedService.roles[0]];
  }

  /**
   * Method that logouts user and navigate to login page
   */
  // logout() {
  //   this.pushNotificationService.deletePushNotificationToken().subscribe(() => {
  //     localStorage.clear();
  //     this.router.navigate(['login']);
  //     this.toastMsgService.showSuccess('Logged Out Successfully');
  //   })
  // }

  /**
   * Method that maintain object with link name as key and boolean value
   * and then used to determine if nav-link is expanded or not
   * @param name 
   */
  toggleSubMenu(name: string) {
    this.showSubMenu[name] = !this.showSubMenu[name];
  }

  /**
   * Method that invokes when mouse pointer moves into side-nav
   * and it opens side-nav
   */
  // expandSideNav() {
  //   this.sharedService.isSideNavOpen$.next(true);
  // }

  /**
   * Method that invokes when mouse pointer moves out of sidenav
   * and it closes the side-nav 
   */
  // collapseSideNav() {
  //   if (!this.isServicesMenuOpen) this.sharedService.isSideNavOpen$.next(false);
  // }

  /**
   * Method that filters nav-links based on role and service
   */
  setNavLinks() {
    this.navLinks = navLinks.filter(link => {
      if (link.subMenu) {
        link.filteredSubMenu = link.subMenu.filter(sub => {
          const subRoute = "/" + sub.route;
          for (const i of Object.keys(allowedRouteAccessTo)) {
            if (i === subRoute) {
              return allowedRouteAccessTo[i].service.includes(this.service as Services) &&
                allowedRouteAccessTo[i].role.some(r => this.sharedService.roles.includes(r));
            }
          }
        })
        // this condition is to remove the main link to be shown in the menu (e.g. data-dump) if the service or role don't have access to subroutes (e.g. cuisines, global var, etc.)
        if (!link.filteredSubMenu.length) {
          return false;
        }
        return true
      }
      const route = "/" + link.route
      for (const i of Object.keys(allowedRouteAccessTo)) {
        if (i === route) {
          return allowedRouteAccessTo[i].service.includes(this.service as Services) &&
            allowedRouteAccessTo[i].role.some(r => this.sharedService.roles.includes(r));
        }
      }
    })
  }
}
