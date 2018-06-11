import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrenciesPage } from '../../models/currencies-page.model';
import { Http, Response } from '@angular/http';
import { CurrenciesPageItem } from '../../models/currencies-page-item.model';
import { map } from 'rxjs/operators';
import { CurrencyDetails } from '../../models/currency-details.model';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  private apiUrl = 'https://api.openfintech.io/v1/';
  constructor(private http: Http) {

  }

  getCurrency(id: string): Observable<CurrencyDetails> {
    const url = `${this.apiUrl}currencies/${id}`;
    return this.http.get(url)
    .pipe(
      map(resp => this.jsonToCurrencyDetails(resp.json()))
    );
  }

  getCurrencies(pageNumber: number, pageSize: number, filter: string = ''): Observable<CurrenciesPage> {

    const url = `${this.apiUrl}currencies?page[number]=${pageNumber}&page[size]=${pageSize}${filter}`;

    return this.http.get(url)
    .pipe(
      map(resp => this.jsonToCurrenciesPage(resp.json()))
    );
  }


  private jsonToCurrencyDetails(json: any): CurrencyDetails {
    const returnValue = new CurrencyDetails();

    returnValue.id = json.data.id;
    returnValue.currencyType = json.data.attributes.currency_type;
    returnValue._symbol = json.data.attributes.symbol;
    returnValue.category = json.data.attributes.category;
    returnValue.name = json.data.attributes.name;
    returnValue.nativeSymbol = json.data.attributes.native_symbol;
    returnValue.decimalE = json.data.attributes.decimal_e;
    returnValue.codeISOAlpha3 = json.data.attributes.code_iso_alpha3;
    returnValue.codeISONumeric3 = json.data.attributes.code_iso_numeric3;
    returnValue.code = json.data.attributes.code;

    return returnValue;
  }

  private jsonToCurrenciesPage(json: any): CurrenciesPage {
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
