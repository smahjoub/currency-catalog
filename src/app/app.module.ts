import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CurrenciesService } from './services/currencies/currencies.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CurrencyDetailComponent } from './components/currency-detail/currency-detail.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { CommonModule } from '@angular/common';
import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    CurrenciesComponent,
    CurrencyDetailComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [CurrenciesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
