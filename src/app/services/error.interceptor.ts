import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertifyService } from "./alertify.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastr: ToastrService,
        private alertifyService : AlertifyService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                if(err){
                    // if(err.status === 400){
                    //     if(err.error.errors){
                    //         throw err.error;
                    //     }
                    //     else{
                    //         this.toastr.error(err.error.message, err.error.statusCode);
                    //     }
                    // }

                    // if(err.status === 404){
                    //     this.toastr.error('Resource found, it was not', '404');
                    // }

                    if(err.status === 401){
                        this.toastr.error(err.error.message, err.error.statusCode);
                    }

                    // if(err.status === 404){
                    //     this.router.navigateByUrl('/not-found')
                    // }

                    if(err.status === 500){
                        // const navigationExtras: NavigationExtras = {state: {error: err.error}}
                        // this.router.navigateByUrl('/server-error', navigationExtras);
                    }
                }
                return throwError(err);
            })
        );
    }

}