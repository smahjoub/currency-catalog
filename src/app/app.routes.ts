import { Routes } from '@angular/router';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CurrencyDetailComponent } from './components/currency-detail/currency-detail.component';


export const appRoutes: Routes = [
    { path: 'currencies', component: CurrenciesComponent },
    { path: 'currency/:id', component: CurrencyDetailComponent },
    { path: '', redirectTo: '/currencies', pathMatch: 'full' }
];
