import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { map, catchError } from "rxjs/operators";
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) {
    }

    getUsers(params: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/users', { params: params })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null)
                    });
                })
            );
    }

    getUser(id: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/users/'+id)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.next(null)
                    });
                })
            );
    }

    createUsers(params: any): Observable<any> {
        return this.httpClient.post(environment.url + 'api/users', params)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error)
                    });
                })
            );
    }

    updateUsers(id: any, params: any): Observable<any> {
        return this.httpClient.put(environment.url + 'api/users/' + id, params)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error)
                    });
                })
            );
    }

    deleteUsers(id: any): Observable<any> {
        return this.httpClient.delete(environment.url + 'api/users/' + id)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error)
                    });
                })
            );
    }
}
