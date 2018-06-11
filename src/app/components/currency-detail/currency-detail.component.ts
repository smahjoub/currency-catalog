import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CurrenciesService } from '../../services/currencies/currencies.service';
import { switchMap } from 'rxjs/operators';
import { CurrencyDetails } from '../../models/currency-details.model';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.css']
})
export class CurrencyDetailComponent implements OnInit {

  public currencyDetails: CurrencyDetails = null;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private currenciesSrv: CurrenciesService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currenciesSrv.getCurrency(id).subscribe(data => this.currencyDetails = data);
    });
  }

}
