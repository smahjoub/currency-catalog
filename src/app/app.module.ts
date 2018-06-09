import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CurrenciesComponent } from './components/currencies/currencies.component';

@NgModule({
  declarations: [
    CurrenciesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [CurrenciesComponent]
})
export class AppModule { }
