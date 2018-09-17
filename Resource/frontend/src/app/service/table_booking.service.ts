import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { map, catchError } from "rxjs/operators";
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

@Injectable({
    providedIn: 'root'
})
export class TableBookingService {

    constructor(private httpClient: HttpClient) {
    }

    getTableBooking(params: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/orders', { params: params })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null);
                    });
                })
            );
    }

    getTableBookings(id: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/orders/'+ id)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null);
                    });
                })
            );
    }

    createTableBooking(params: any): Observable<any> {
        return this.httpClient.post(environment.url + 'api/orders', params)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }

    updateTableBooking(id: any, params: any): Observable<any> {
        return this.httpClient.put(environment.url + 'api/orders/' + id, params)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }

    deleteTableBookings(id: any): Observable<any> {
        return this.httpClient.delete(environment.url + 'api/orders/' + id)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }
}
