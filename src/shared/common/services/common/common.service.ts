import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(@Inject(HttpClient) protected http: HttpClient) {}

  public getCountries(): Observable<any> {
    return this.http.get<any[]>('https://restcountries.eu/rest/v2/all').pipe(
      map((res) => {
        return res;
      })
    );
  }

  public searchCountry(search): Observable<any> {
    return this.http
      .get<any[]>('https://restcountries.eu/rest/v2/name/' + search)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
