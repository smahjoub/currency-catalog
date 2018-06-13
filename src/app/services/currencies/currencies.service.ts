import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrenciesPage } from '../../models/currencies-page.model';
import { CurrenciesPageItem } from '../../models/currencies-page-item.model';
import { map } from 'rxjs/operators';
import { CurrencyDetails } from '../../models/currency-details.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrenciesFilter } from '../../models/currencies-filter.model';


@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  private apiUrl = 'https://api.openfintech.io/v1/';
  constructor(private http: HttpClient) {

  }

  getCurrency(id: string): Observable<CurrencyDetails> {
    const url = `${this.apiUrl}currencies/${id}`;
    return this.http.get(url)
    .pipe(
      map(resp => this.jsonToCurrencyDetails(resp))
    );
  }

  getCurrencies(pageNumber: number, pageSize: number, filter: CurrenciesFilter): Observable<CurrenciesPage> {
    let params = new HttpParams();

    if (filter.isEmptyFilter() === false) {
      params = filter.getParams();
    }

    params = params.append('page[number]', pageNumber.toString());
    params = params.append('page[size]', pageSize.toString());

    const url = `${this.apiUrl}currencies`;

    return this.http.get(url, {params: params})
    .pipe(
      map(resp => this.jsonToCurrenciesPage(resp))
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
