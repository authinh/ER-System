import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { map, catchError } from "rxjs/operators";
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

@Injectable({
    providedIn: 'root'
})
export class CustomerProfileService {

    constructor(private httpClient: HttpClient) {
    }

    getProfile(): Observable<any> {
        return this.httpClient.get(environment.url + 'api/customers/profile')
            .pipe(
                map((data:any) => {
                    if(data.accessToken){
                        localStorage.setItem('authToken', data.accessToken);
                    }
                    return data;
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

    udpate(data:any): Observable<any> {
        return this.httpClient.put(environment.url + 'api/customers/profile', data)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null)
                    });
                })
            );
    }

    getProfileByPhone(phoneNumber: string): Observable<any> {
        return this.httpClient.get(environment.url  + "api/customers/?phone=" + phoneNumber)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null);
                    });
                })
            );
    }
}
