import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { map, catchError } from "rxjs/operators";
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

@Injectable({
    providedIn: 'root'
})
export class AvailableTableService {

    constructor(private httpClient: HttpClient) {
    }

    getAvailableTables(params: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/avaiable-tables', { params: params })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null);
                    });
                })
            );
    }

    getListAvailableTableParent(id: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/avaiable-tables/except/'+ id)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null);
                    });
                })
            );
    }

    getAvailableTable(id: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/avaiable-tables/'+ id)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null);
                    });
                })
            );
    }

    createAvailableTables(params: any): Observable<any> {
        return this.httpClient.post(environment.url + 'api/avaiable-tables', params)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }

    updateAvailableTables(id: any, params: any): Observable<any> {
        return this.httpClient.put(environment.url + 'api/avaiable-tables/' + id, params)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }

    deleteAvailableTables(id: any): Observable<any> {
        return this.httpClient.delete(environment.url + 'api/avaiable-tables/' + id)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }
}
