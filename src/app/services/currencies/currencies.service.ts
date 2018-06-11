import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrenciesPage } from '../../models/currencies-page.model';
import { Http, Response } from '@angular/http';
import { CurrenciesPageItem } from '../../models/currencies-page-item.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  private apiUrl = 'https://api.openfintech.io/v1/currencies';
  constructor(private http: Http) {

  }

  getCurrencies(pageNumber: number, pageSize: number, filter: string = ''): Observable<CurrenciesPage> {

    const url = `${this.apiUrl}?page[number]=${pageNumber}&page[size]=${pageSize}${filter}`;

    return this.http.get(url)
    .pipe(
      map(resp => this.jsonToCurrenciesPage(resp.json()))
    );
  }

  private jsonToCurrenciesPage(json: any) {
    const returnValue = new CurrenciesPage();
    returnValue.total = json.meta.total;
    returnValue.pages = json.meta.pages;

    returnValue.data = [];

    if (json.data !== undefined) {
      for (let i = 0; i < json.data.length; i++) {
        const pageItem    = new CurrenciesPageItem();
        pageItem.id     = json.data[i].id;
        pageItem.type   = json.data[i].attributes.currency_type;
        pageItem.symbol = json.data[i].attributes.symbol;

        returnValue.data.push(pageItem);
      }
    }

    return returnValue;
  }
}
