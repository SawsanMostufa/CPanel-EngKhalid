import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonSearchModel } from '../models/searchModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.apiUrl + 'category/';

  constructor(private http: HttpClient) { }

  getCategorPaging(commonSearchModel: CommonSearchModel): any {
    return this.http.post(this.url + 'getCategorPaging', commonSearchModel);
  }

  getAllCategories(): any {
    return this.http.get(this.url + 'getAllCategories');
  }

  updateCategory(category: any) {
    return this.http.post(this.url + 'updateCategory' , category);
  }

  addCategory(category: any) {
    return this.http.post(this.url + 'addCategory' , category);
  }

  deleteCategory(id: any): any {
    return this.http.delete(this.url + 'deleteCategor/' + id);
  }
}
