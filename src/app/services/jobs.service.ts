import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiParameters } from '../models/apiParameters';
import { SearchModel } from '../models/searchModel';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private url = environment.apiUrl + 'JobApi/';

  constructor(private http: HttpClient) { }

  GetJobs(pageNo: number): any {
    return this.http.get(this.url + 'GetJobs?pageNo='+ pageNo);
  }

  GetJobsSearch(searchModel: SearchModel) {
    return this.http.post(this.url + 'GetJobs' , searchModel);
  }
  //add new and update
  addJob(job: any) {
    return this.http.post(this.url + 'SaveJob' , job);
  }

  findJob(params: ApiParameters) {
    return this.http.post(this.url + 'FindJob', params);
  }

  deleteJob(id: any): any {
    return this.http.get(this.url + 'DeleteJob/' + id);
  }


}
