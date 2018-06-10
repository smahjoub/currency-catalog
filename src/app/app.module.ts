import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CurrenciesService } from './services/currencies/currencies.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    CurrenciesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule 
  ],
  providers: [CurrenciesService],
  bootstrap: [CurrenciesComponent]
})
export class AppModule { }
