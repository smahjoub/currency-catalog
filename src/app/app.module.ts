import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CurrenciesService } from './services/currencies/currencies.service';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CurrenciesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [CurrenciesService],
  bootstrap: [CurrenciesComponent]
})
export class AppModule { }
