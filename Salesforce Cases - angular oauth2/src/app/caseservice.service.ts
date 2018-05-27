import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CaseserviceService {

  constructor(private http: HttpClient) { }

  getCases(access_token: string, instanceURL: string, accountName: string): Promise<Case[]> {
    instanceURL = decodeURIComponent(decodeURIComponent(instanceURL));
    console.log(instanceURL);
    const restLocation = instanceURL + '/services/data/v40.0/query';
    return this.http.get(restLocation, { headers : new HttpHeaders().set('Authorization', 'Bearer ' + access_token), params: this.getParams(accountName), observe: 'response' })
               .toPromise().then(response => response.body['records']).catch(this.handleError);
  }

  getParams(accountName: string): HttpParams {
    const params = new HttpParams({
      fromString: 'q=SELECT Id, CaseNumber, Subject FROM Case where Account.Name = \'' + accountName + '\'  LIMIT 100'
    });
    return params;
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}

export class Case {
  Id: string;
  CaseNumber: string;
  Subject: string;
}
