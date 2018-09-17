import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { map, catchError } from "rxjs/operators";
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { pipe } from '@angular/core/src/render3/pipe';
import { CanActivateChild, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements CanActivate, CanActivateChild {
    isStaff: Boolean = false;
    userProfile: any;
    customerProfile: any;
    constructor(private httpClient: HttpClient, private router: Router) {
    }
    logout(){
        this.isStaff=false;
        this.userProfile = null;
        this.customerProfile = null;
    }
    getProfile() {
        if (this.isStaff == true) {
            return new Observable((observer: InnerSubscriber<any, any> ) => {
                observer.next(this.userProfile)
            });
        }
        return this.httpClient.get(environment.url + 'api/users/profile')
            .pipe(
                map((res: any) => {
                    this.isStaff = true;
                    if (res.accessToken) {
                        localStorage.setItem('authToken', res.accessToken)
                    }
                    this.userProfile = res;
                    SharedService.userLogin.next();
                    return res;
                })
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.getCustomerProfile();
                })
            );
    }

    getCustomerProfile() {
        if (this.customerProfile != null) {
            return new Observable((observer: InnerSubscriber<any, any> ) => {
                observer.next(this.customerProfile)
            });
        }
        return this.httpClient.get(environment.url + 'api/customers/profile')
            .pipe(
                map((res: any) => {
                    this.isStaff = false;
                    if (res.accessToken) {
                        localStorage.setItem('authToken', res.accessToken)
                    }
                    this.customerProfile = res;
                    return res;
                })
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null)
                    });
                })
            );
    }

    canActivate(): Observable<boolean> {
        return this.getProfile().pipe(map((profile) => {
            console.log("canActivate", profile)
            if (profile!=null) {
                return true;
            } else {
                this.router.navigate(['/403']);
                return false;
            }
        }));
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getProfile().pipe(map((profile) => {
            console.log("canActivateChild", profile)
            let isAccess = false;
            if (profile.role == null) {
                isAccess = route.data.roles.indexOf('CUSTOMER') > -1;
            } else {
                isAccess = route.data.roles.indexOf(profile.role.name) > -1;
            }
            if (!isAccess) {
                this.router.navigate(['/403']);
            }
            return isAccess;
        }));
    }
}
