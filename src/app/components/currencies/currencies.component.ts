import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../../services/currencies/currencies.service';
import { CurrenciesPage } from '../../models/currencies-page.model';
import { Observable } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  readonly filterTypes = ['Id', 'Code', 'Name', 'Type'];

  currentPage = 1;
  pageSize    = 200;

  pageContent: CurrenciesPage = null;

  filter = '';
  filterType = this.filterTypes[0];

  constructor(private currenciesSrv: CurrenciesService) {

  }

  ngOnInit() {

    this.doFilter();
  }

  doFilter(filter: string = '', filterType: string = this.filterTypes[0]) {
    // clear current listing
    this.pageContent = null;

    //build filter query string
    let queryString = '';
    if (filter !== '') {
      switch (filterType) {
        case this.filterTypes[0]: //Id
        queryString = `&filter[search]=${filter}`;
        break;
        case this.filterTypes[1]: //Code
        queryString = `&filter[code_iso_alpha3]=${filter}`;
        break;
        case this.filterTypes[2]: //Name
        queryString = `&filter[search]=${filter}`;
        break;
        case this.filterTypes[3]: //Type
        queryString = `&filter[currency_type]=${filter}`;
        break;
        default: //Empty string
        break;
      }
    }


    this.currenciesSrv.getCurrencies(this.currentPage, this.pageSize, queryString)
      .subscribe(data => this.pageContent = data);
  }
}
