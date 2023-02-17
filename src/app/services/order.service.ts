import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchModel } from '../models/searchModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.apiUrl + 'order/';

  constructor(private http: HttpClient) { }

  getOrders(searchModel: SearchModel): any {
    return this.http.post(this.url + 'getOrders', searchModel);
  }

  getOrderItems(orderId: number): any {
    return this.http.get(this.url + 'getOrderItems/'+orderId);
  }

  // getOrdersSearch(searchModel: SearchModel): any {
  //   return this.http.post(this.url + 'getOrdersSearch',searchModel);
  // }

  // updateCategory(category: any) {
  //   return this.http.post(this.url + 'updateCategory' , category);
  // }

  // addCategory(category: any) {
  //   return this.http.post(this.url + 'addCategory' , category);
  // }

  // deleteCategory(id: any): any {
  //   return this.http.get(this.url + 'deleteCategor/' + id);
  // }
}
