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

  currentPage = 1;
  pageSize    = 200;

  pageContent: CurrenciesPage = null;

  constructor(private currenciesSrv: CurrenciesService) {

  }

  ngOnInit() {
    this.currenciesSrv.getCurrencies(this.currentPage, this.pageSize)
      .subscribe(data => this.pageContent = data);

  }

}
