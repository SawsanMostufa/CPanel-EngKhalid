import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
// import { UserToUpdate } from '../models/userToUpdate';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currenyUser: any;
  sysLogo: string = '';
  private baseUrl = environment.apiUrl + 'Account/';
  baseImageUrl = environment.imageUrl + "UserImages/";
  jwtHelpler = new JwtHelperService();

  imgUrl = new BehaviorSubject<string>('');
  sysNameAr = new BehaviorSubject<string>('');
  sysNameEn = new BehaviorSubject<string>('');
  langName = new BehaviorSubject<string>('');

  currentSysNameAr = this.sysNameAr.asObservable();
  currentSysNameEn = this.sysNameEn.asObservable();
  currentImgUrl = this.imgUrl.asObservable();
  currentLanguage = this.langName.asObservable();
 

  constructor(private http: HttpClient, private router: Router, private spinner: NgxSpinnerService) 
  {    
  }

    login(user: User) {
      return this.http.post(this.baseUrl + 'adminLogin', user);
  }

    loggedIn() {
      const token = localStorage.getItem('token');
      return !this.jwtHelpler.isTokenExpired(token);
    }

    public logout() {
      let _token = localStorage.getItem('token');
      let _displayName = localStorage.getItem('displayName');

      this.spinner.show();
      setTimeout(() => {             
        if (_token && _displayName) {
          localStorage.removeItem('token');
          localStorage.removeItem('displayName');
          this.router.navigate(['/login']);
          this.spinner.hide();
          return !this.jwtHelpler.isTokenExpired(_token);
        }
        else{
          localStorage.removeItem('token');
          localStorage.removeItem('displayName');
          localStorage.removeItem('userData'); 

          this.router.navigate(['/login']);
          this.spinner.hide();
          return !this.jwtHelpler.isTokenExpired(_token);
        }
      }, 100);
    }

    changeSystemLogo(imgUrl: string) {
      debugger
       if(imgUrl == "" || imgUrl == null){
        var imgae = localStorage.getItem('image');
        localStorage.setItem('image', imgae);
        this.imgUrl.next(imgae);
       }
       else{
        localStorage.setItem('image', imgUrl);
        this.imgUrl.next(imgUrl);
       }
    }

    changeSysName(sysName: string) {
       if(sysName == "" || sysName == null){
        this.sysNameAr.next(sysName);
       }
       else{       
        this.sysNameAr.next(sysName);
       }
    }

    changeSysNameEn(sysName: string) {
      if(sysName == "" || sysName == null){
       this.sysNameEn.next(sysName);
      }
      else{       
       this.sysNameEn.next(sysName);
      }
   }

    changeLanguage(langName: string) {      
      localStorage.setItem('lang', langName);
      this.langName.next(langName);
    }

    //for users
    updateUser(user: any) {
      return this.http.post(this.baseUrl + 'updateUser' , user)
    }
    
    updateProfile(user: any) {
      return this.http.post(this.baseUrl + 'updateProfile' , user)
    }
               
    getUsers(): any {
      return this.http.get(this.baseUrl + 'getUsers');
    }

    getCustomers(): any {
      return this.http.get(this.baseUrl + 'getCustomers');
    }

    getUser(id: Number): any {
      return this.http.get(this.baseUrl + 'getUser/' + id);
    }

    getUserLogin(): any {
      return this.http.get(this.baseUrl + 'getUserLogin');
    }

    deleteUser(id: Number): any {
      return this.http.get(this.baseUrl + 'deleteUser/' + id);
    }

    register(user: User, type: string) {
      return this.http.post(this.baseUrl + 'register/'+ type, user);
    }   

    getLoginLogo(): any {
      return this.http.get(this.baseUrl + 'getLoginLogo');
    }

}
