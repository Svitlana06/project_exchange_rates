import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ExchangeRatesComponent} from "./modules/exchangeRates/components/exchangeRates/exchangeRates.component";

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRatesComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [

  ],

  bootstrap: [AppComponent]

})
export class AppModule { }
