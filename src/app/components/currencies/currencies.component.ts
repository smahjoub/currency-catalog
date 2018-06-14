import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../../services/currencies/currencies.service';
import { CurrenciesPage } from '../../models/currencies-page.model';
import { Observable } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CurrenciesFilter, FilterType } from '../../models/currencies-filter.model';
@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  readonly filterTypes = ['Id', 'Code', 'Name', 'Type'];

  currentPage = 1;
  pageSize    = 10;

  pageContent: CurrenciesPage = null;

  filter = '';
  filterType = this.filterTypes[0];

  constructor(private currenciesSrv: CurrenciesService,
    private router: Router) {

  }

  ngOnInit() {
    this.doFilter();
  }

  getCurrencyDetails(id: string) {
    this.router.navigate(['currency/', id]);
  }

  doFilter(filter: string = '', filterType: string = this.filterTypes[0]) {
    const currenciesFilter = new CurrenciesFilter(FilterType[filterType], filter);

    this.currenciesSrv.getCurrencies(this.currentPage, this.pageSize, currenciesFilter)
      .subscribe(data => this.pageContent = data);
  }

}
