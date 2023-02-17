import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonSearchModel } from '../models/searchModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.apiUrl + 'product/';

  constructor(private http: HttpClient) { }

  getProductsPaging(commonSearchModel: CommonSearchModel): any {
    return this.http.post(this.url + 'getProductsPaging', commonSearchModel);
  }

  deleteProduct(id: any): any {
    return this.http.delete(this.url + 'deleteProduct/' + id);
  }

  addProduct(category: any) {
    return this.http.post(this.url + 'addProduct' , category);
  }

  updateProduct(category: any) {
    return this.http.post(this.url + 'updateProduct' , category);
  }

  

}
