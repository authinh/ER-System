import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { map, catchError } from "rxjs/operators";
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private httpClient: HttpClient) {
    }

    login(data: any): Observable<any> {
        return this.httpClient.post(environment.url + 'api/users/login', data)
            .pipe(
            map((data: any) => {
                if (data.accessToken) {
                    localStorage.setItem('authToken', data.accessToken);
                    return data;
                }
                return null;
            })
            ).pipe(
            catchError((error: HttpErrorResponse) => {
                return new Observable((observer: InnerSubscriber<any, any> ) => {
                    observer.next(null)
                });
            })
            );
    }

    getFoodCategory(): Observable<any> {    
        return this.httpClient.get(environment.url + 'api/categories/')
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.next(null)
                    });
                })
            );
    }

    getCustomerByPhone(phone: String): Observable<any> {
        return this.httpClient.get(environment.url + 'api/customer?phone='+ phone)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getFoodByPageAndCategory(CategoryId:number, page:number): Observable<any> {    
        console.log("api/foods?page="+page +"&category="+CategoryId);
        return this.httpClient.get(environment.url + "api/foods?page="+page +"&category="+CategoryId)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.next(null)
                    });
                })
            );
    }
   
}
