import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { map, catchError } from "rxjs/operators";
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private httpClient: HttpClient) {
    }

    getOrders(params: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/orders', { params: params })
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getOrdersByPhone(phoneNumber: string, params: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/orders?search=' + phoneNumber + '&status=-1', { params: params })
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getListOrderParent(id: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/orders/except/'+ id)
           .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getOrder(id: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/orders/'+ id)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getOrderDetail(id: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/orderdetail/'+ id)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    createOrders(params: any): Observable<any> {
        return this.httpClient.post(environment.url + 'api/orders', params)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    updateOrders(id: any, params: any): Observable<any> {
        return this.httpClient.put(environment.url + 'api/orders/' + id, params)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }

    updateOrderByOrderDetail(id: any, params: any): Observable<any> {
        return this.httpClient.put(environment.url + 'api/orders/update/' + id, params)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }

    deleteOrders(id: any): Observable<any> {
        return this.httpClient.delete(environment.url + 'api/orders/' + id)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }

    checkout(id: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/orders/' + id + '/checkout')
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }

    changeDetailStatus(id: number, status: number,orderID: number,): Observable<any> {
        let query = environment.url + 'api/orders/detail/' + id + '?status=' + status+'&order_id=' + orderID;
        return this.httpClient.post(query, "")
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }

    getRecommend(foods:String, size:number): Observable<any> {
        foods = foods.substr(3,foods.length);
        let query = environment.url + 'api/recommend/?food=' + foods+'&size=' + size;
        return this.httpClient.get(query)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return new Observable((observer: InnerSubscriber<any, any> ) => {
                        observer.error(error);
                    });
                })
            );
    }
}
