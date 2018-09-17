import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, mergeMap, filter } from "rxjs/operators";
import { AuthenticationService } from './service/authentication.service';
import { SharedService } from './service/shared.service';
declare var window: Window;

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private authService: AuthenticationService
  ) { }
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .pipe(
        map(() => this.activatedRoute)
      )
      .pipe(
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
      )
      .pipe(
        filter((route) => route.outlet === 'primary')
      )
      .pipe(
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        if (event['title']) {
          this.titleService.setTitle(event['title']);
        }
      });
    SharedService.userLogin.subscribe(() => {
      this.authService.getProfile().subscribe(data => {
        this.initRealtime();
        data ? (data.role ? (data.role.id == 3 ? this.initNotiForChef() : '') : '') : '';
        data ? (data.role ? (data.role.id == 4 ? this.initNotiForWaiter() : '') : '') : '';
      })
    })
  }
  initRealtime(){
    var orderdetail = window.pusher.subscribe('orderdetail');
    orderdetail.bind('change-status-food', function (data) {
      SharedService.foodStatusChange.next();
    });
  }
  initNotiForChef() {
    var chefChannel = window.pusher.subscribe('chef-channel');
    chefChannel.bind('orderdetail-precook', function (data) {
      SharedService.newFoodPreCook.next(data);
      window.showNotification("Buzz! Buzz!", {
        body: 'Có món cần nấu',
        icon: 'assets/img/noti_icon.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample',
        data: {
          url: '../#/manage/chef'
        }
      })
    });
  }

  initNotiForWaiter() {
    var chefChannel = window.pusher.subscribe('waiter-channel');
    chefChannel.bind('orderdetail-done', function (data) {
      SharedService.newFoodReady.next(data);
      window.showNotification("Buzz! Buzz!", {
        body: 'Có món nấu xong',
        icon: 'assets/img/noti_icon.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample',
        data: {
          url: '../#/manage/chef'
        }
      })
    });
  }
}
interface Window {
  showNotification?: any;
  pusher?: any
}