import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { map, catchError } from "rxjs/operators";
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) {
    }

    getAllCategory(): Observable<any> {
        return this.httpClient.get(environment.url + "api/categories?size=999")
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    findFood(params: any): Observable<any> {
        return this.httpClient.get(environment.url + 'api/foods', { params: params })
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getFoodbyPage(page:number, categoryId:number, size:number): Observable<any> {
        let query = environment.url + "api/foods?"  
        query = query + "&page=" + page;
        query = query + "&category="+categoryId;
        query = query + "&size=" + size;
        return this.httpClient.get(query)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    getOneFood(foodId: number): Observable<any> {    
        return this.httpClient.get(environment.url + "api/foods/" + foodId)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }

    createNewFood(food: any): Observable<any> {
    	return this.httpClient.post(environment.url + "api/foods", food)
    		.pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );	
    }

    updateFood(food: any): Observable<any> {
    	return this.httpClient.put(environment.url + "api/foods", food)
    		.pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );	
    }

    deleteFood(foodId: number): Observable<any> {   
        return this.httpClient.delete(environment.url + "api/foods/" + foodId)
            .pipe(
                catchError((error:HttpErrorResponse) => {
                    return new Observable((observer:InnerSubscriber<any, any> )=>{
                        observer.error(error)
                    });
                })
            );
    }
}
