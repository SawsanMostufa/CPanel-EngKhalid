import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { JobsService } from '../services/jobs.service';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsResolverService implements Resolve<any[]>{

  constructor(private jobsService: JobsService, 
    private alertify: AlertifyService, private router: Router,
    private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.jobsService.GetJobs(1).pipe(
      catchError(error => {
        //this.alertify.tError('خطأ اثناء تحميل البيانات');
        this.authService.logout();
        this.router.navigate(['/login']);
          return of(null);
      })
    )
  }


}
