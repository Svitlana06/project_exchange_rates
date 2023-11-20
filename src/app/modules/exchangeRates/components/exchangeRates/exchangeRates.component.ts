import {Component, OnInit} from '@angular/core';
import {CurrenciesService} from '../../services/currencies';
import {ICurrenciesAll} from '../../interfaces/currenciesAll';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-exchangeRates',
  templateUrl: './exchangeRates.component.html',
  styleUrls: ['./exchangeRates.component.css']
})
export class ExchangeRatesComponent implements OnInit {
  currencies: ICurrenciesAll[]
  currency: ICurrenciesAll;
  sumSelectedFirst: number;
  sumSelectedSecond: number;
  currentSelectedFirst: number;
  currentSelectedSecond: number;
  currentSumFirst: number = 0;
  currentResultFirst: string;
  currentResultSecond: string;
  currentSumSecond: number = 0;
  check: boolean;
  activeInput: boolean = false;
  usdRate: ICurrenciesAll | undefined;
  eurRate: ICurrenciesAll | undefined;

  constructor(private currenciesService: CurrenciesService) {
  }


  ngOnInit(): void {
    this.currenciesService.getAll().subscribe(value => {
      this.currencies = value
      this.usdRate = this.currencies.find((item) => item.cc === "USD");
      this.eurRate = this.currencies.find((item) => item.cc === "EUR")
    })

  }

  catchErrorsFirstChanged() {
    if (isNaN(this.sumSelectedFirst) || isNaN(this.currentSelectedSecond)) {
      this.sumSelectedSecond = 0;
    }

    this.currentResultFirst = (this.currentSumFirst * this.currentSelectedFirst /
      this.currentSelectedSecond).toFixed(3)


  }

  catchErrorsSecondChanged() {
    if (isNaN(this.sumSelectedSecond) || isNaN(this.currentSelectedFirst)) {
      this.sumSelectedFirst = 0;
    }
    this.currentResultSecond = (this.currentSumSecond * this.currentSelectedSecond /
      this.currentSelectedFirst).toFixed(3)
  }

  buttonClear() {
    this.currentSumSecond = 0;
    this.currentSumFirst = 0;
    this.currentResultSecond = "";
    this.currentResultFirst = "";
    this.activeInput = false;
  }

  changedSecondInput(value: string) {
    this.activeInput = true;
    this.currentSumSecond = Number(value)
    if (this.currentSelectedSecond === undefined || this.currentSelectedFirst === undefined) {
      this.currentSelectedSecond = 0;
    }
    this.catchErrorsSecondChanged()
    this.check = false;
  }

  onSubmit(form: NgForm) {
  }

  changedFirstOption(value: string) {
    for (this.currency of this.currencies) {
      if (this.currency.cc === value) {
        this.currentSelectedFirst = this.currency.rate
      }
    }
    if (this.check && this.currentSumFirst > 0) {
      this.currentResultFirst = (this.currentSumFirst * this.currentSelectedFirst /
        this.currentSelectedSecond).toFixed(3)
    }
    if (!this.check && this.currentSumSecond > 0) {
      this.currentResultSecond = (this.currentSumSecond * this.currentSelectedSecond /
        this.currentSelectedFirst).toFixed(3)
    }
  }

  changedSecondOption(value: string) {
    for (this.currency of this.currencies) {
      if (this.currency.cc === value) {
        this.currentSelectedSecond = this.currency.rate
      }
    }
    if (this.check && this.currentSumFirst > 0) {
      this.currentResultFirst = (this.currentSumFirst * this.currentSelectedFirst /
        this.currentSelectedSecond).toFixed(3)
    }
    if (this.check && this.currentSumSecond > 0) {
      this.currentResultSecond = (this.currentSumSecond * this.currentSelectedSecond /
        this.currentSelectedFirst).toFixed(3)
    }
  }

  changedFirstInput(value: string) {
    this.currentSumFirst = Number(value)
    if (this.currentSelectedFirst === undefined) {
      this.currentSelectedFirst = 0;
    }
    this.catchErrorsFirstChanged()
    this.check = true;
    this.activeInput = false;
    if ((this.currentSelectedFirst === 0 && this.currentSelectedSecond === 0) ||
      (this.currentSelectedFirst === undefined && this.currentSelectedSecond === undefined)
      && !this.activeInput) {
      this.activeInput = true;

    }
  }
}
