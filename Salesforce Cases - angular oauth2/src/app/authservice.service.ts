import { Injectable } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';

@Injectable()
export class AuthserviceService {

  constructor(private http: HttpClient, private location: Location, private activatedRoute: ActivatedRoute) {}

  getSalesforceAuthorize(): void {
      let  a = location.href;
      if (! a.includes('access_token')) {
        const environment = 'https://test.salesforce.com/services/oauth2/authorize';
        this.http.get(environment, { headers : this.getHeaderAuthorize(), params: this.getParamsAuthorize(), observe: 'response' })
               .toPromise().then(response => response.url)
               .catch(this.handleError)
               .then(url => {
                  window.open(url, '_self');
                });
      } else {
        this.activatedRoute.fragment.subscribe(fragment => {
              if (fragment) {
                this.location.go('case');
              }
          });
      }
  }

  getParamsAuthorize = () => {
    const params = new HttpParams({
      fromString: 'response_type=token&client_id=TAKE_FROM_SALESFORCE&redirect_uri= eg: https://angulartest.net:4200/callback&display=page'
    });
    return params;
  }

  getHeaderAuthorize = () => {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}

@Injectable()
export class SalesforceOauthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('HTTP handler !!!');

    return next.handle(request).do((event: HttpEvent<any>) => {

      if (event instanceof HttpHeaderResponse) {
        console.log('HttpHeaderResponse !!!');
      }

      if (event instanceof HttpResponse) {
        console.log('HttpResponse !!!');
      }
    }, (err: any) => {
      console.log('ERROR !!!');
      if (err instanceof HttpErrorResponse) {
        console.log('HttpErrorResponse !!!');
        if (err.status === 302) {
          console.log('302 !!!');
        }
      }
    });
  }
}

