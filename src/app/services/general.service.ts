

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GeneralService {
  public platformId: any;

  constructor(public httpClient: HttpClient) {
  }

  public get(url: string, headers?): Observable<any> {
    return this.httpClient.get<any>(url, headers);
   // .catch((e: any) => Observable.throw( new ErrorHandler(e, this.authTokenService, this.logger, this.httpClient).handleError() ));
  }

  public post(url: string, body: any, headers?): Observable<any> {
    return this.httpClient.post<any>(url, body, headers)
    //.catch((e: any) => Observable.throw(new ErrorHandler(e, this.authTokenService, this.logger, this.httpClient).handleError()));
  }

  public put(url: string, body: any, headers?): Observable<any> {
    return this.httpClient.put<any>(url, body, headers)
    //.catch((e: any) => Observable.throw(new ErrorHandler(e, this.authTokenService, this.logger, this.httpClient).handleError()));
  }

  public delete(url: string, headers?): Observable<any> {
    return this.httpClient.delete<any>(url, headers)
    //.catch((e: any) => Observable.throw(new ErrorHandler(e, this.authTokenService, this.logger, this.httpClient).handleError()));
  }
}

