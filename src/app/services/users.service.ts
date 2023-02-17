import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiParameters } from '../models/apiParameters';
import { SearchModel } from '../models/searchModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.apiUrl + 'UserApi/';
  
  constructor(private http: HttpClient) { }

  getUsers(pageNo: number): any {
    return this.http.get(this.url + 'GetUsers?pageNo='+ pageNo);
  }

  getGroups(): any {
    return this.http.get(this.url + 'GetUserGroups');
  }

  getUsersSearch(searchModel: SearchModel) {
    return this.http.post(this.url + 'GetUsersSearch' , searchModel);
  }

  findUser(params: ApiParameters) {
    return this.http.post(this.url + 'FindUser', params);
  }

  findVwUser(params: ApiParameters) {
    return this.http.post(this.url + 'FindVwUser', params);
  }

  saveUser(user: any) {
    return this.http.post(this.url + 'SaveUser' , user);
  }

  changeUserStatus(id: any): any {
    return this.http.get(this.url + 'changeUserStatus/' + id);
  }
}
