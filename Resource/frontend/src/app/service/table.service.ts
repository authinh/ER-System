import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpErrorResponse } from '@angular/common/http';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

@Injectable({
    providedIn: 'root'
})
export class TableServiceService {

    constructor(private httpClient: HttpClient) { }

    getAllTable(params: any): Observable<any> {
        return this.httpClient.get(environment.url + '/api/tables/', { params: params })
            .pipe(
            catchError((error: HttpErrorResponse) => {
                return new Observable((observer: InnerSubscriber<any, any> ) => {
                    observer.error(error)
                });
            })
            );
    }

    getTableByID(tableID: number): Observable<any> {
        return this.httpClient.get(environment.url + 'api/tables/' + tableID)
            .pipe(
            catchError((error: HttpErrorResponse) => {
                return new Observable((observer: InnerSubscriber<any, any> ) => {
                    observer.error(error)
                });
            })
            );
    }

    editTableById(tableId: number, data: any): Observable<any> {
        return this.httpClient.put(environment.url + "api/tables/" + tableId, data)
            .pipe(
            catchError((error: HttpErrorResponse) => {
                return new Observable((observer: InnerSubscriber<any, any> ) => {
                    observer.error(error)
                });
            })
            );
    }

    createNewTable(table: any): Observable<any> {
        return this.httpClient.post(environment.url + "api/tables/", table)
            .pipe(
            catchError((error: HttpErrorResponse) => {
                return new Observable((observer: InnerSubscriber<any, any> ) => {
                    observer.error(error)
                });
            })
            );
    }

    deleteTableById(tableId: number): Observable<any> {
        return this.httpClient.delete(environment.url + "api/tables/" + tableId)
            .pipe(
            catchError((error: HttpErrorResponse) => {
                return new Observable((observer: InnerSubscriber<any, any> ) => {
                    observer.error(error)
                });
            })
            );
    }

    getAvailableTable(dateTime: string, pageNumber: number): Observable<any> {
        return this.httpClient.get(environment.url + "api/tables/available?date=" + dateTime + "&page="+pageNumber)
            .pipe(
            catchError((error: HttpErrorResponse) => {
                return new Observable((observer: InnerSubscriber<any, any> ) => {
                    observer.error(error)
                });
            })
            );
    }
}
