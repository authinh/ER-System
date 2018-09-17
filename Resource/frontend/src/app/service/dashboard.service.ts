import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { map, catchError } from "rxjs/operators";
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  

  constructor(private httpClient: HttpClient) {
    }

    getFoodRankDashboard(limit:number, month:number): Observable<any> {
        let query = environment.url + "dashboard/foodrank?"  
        query = query + "limit=" + limit;
        query = query + "&month="+ month;
        return this.httpClient.get(query)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getFoodRankWithQuantity(limit:number, month:number): Observable<any> {
        let query = environment.url + "dashboard/foodRankByQuantity?"  
        query = query + "limit=" + limit;
        query = query + "&month="+ month;
        return this.httpClient.get(query)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getrankFrameTime(month:number): Observable<any> {
        let query = environment.url + "dashboard/rankFrameTime?"  
        query = query + "month="+ month;
        return this.httpClient.get(query)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getStaticLine(type:number): Observable<any> {
        let query = environment.url + "dashboard/staticsLine?"  
        query = query + "type="+ type;
        return this.httpClient.get(query)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

}
