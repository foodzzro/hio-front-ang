import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NotifyService } from '../notify.service';
import { Router } from '@angular/router';

 
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(private notify: NotifyService, private $router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token; 
        let data = localStorage.getItem('user');
        if (data) {
            token = JSON.parse(data).token;
            // Clone the request to add the new header.
            const authReq = req.clone({ headers: req.headers.set('Authorization', "Bearer " + token) });
            return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // process successful responses here
                }
            }, (errorObject: any) => {
                if (errorObject instanceof HttpErrorResponse) {
 
                    if(errorObject.status == 504) {
                        this.$router.navigateByUrl('/login');
                    }
                    this.notify.error(errorObject.error.message);
                    window.navigator.vibrate(500);
                    
                    console.log(errorObject);
                    if (errorObject.status === 500 && errorObject.error.message == "Expired or invalid JWT token") {
                        this.$router.navigateByUrl(`/login`);
                        return;
                    }
                }
            }));
        }
        else {
            return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // process successful responses here
                }
            }, (errorObject: any) => {
                if (errorObject instanceof HttpErrorResponse) {
                    this.notify.error(errorObject.error.message);
                }
            }));
        }
    }
}