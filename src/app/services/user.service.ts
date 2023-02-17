import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonSearchModel } from '../models/searchModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + 'account/';

  constructor(private http: HttpClient) { }

  getUsers(commonSearchModel: CommonSearchModel): any {
    return this.http.post(this.url + 'getUsers', commonSearchModel);
  }

  deleteUser(userId: any){
    return this.http.delete(this.url + 'deleteUser/'+ userId);
  }
  
  getMyProfile(){
    return this.http.get(this.url + 'getMyProfile');
  }

  updateMyProfile(user: any){
    return this.http.post(this.url + 'updateMyProfile', user);
  }
}
