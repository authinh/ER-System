import { Injectable, Output, EventEmitter } from '@angular/core';
@Injectable()
export class SharedService {
    constructor() { }
    public static userLogin = new EventEmitter<Object>();
    public static newFoodPreCook = new EventEmitter<Object>();
    public static newFoodReady = new EventEmitter<Object>();
    public static foodStatusChange = new EventEmitter<Object>();
}