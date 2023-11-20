import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urls } from 'src/app/constants/urls';
import { ICurrenciesAll } from '../interfaces/currenciesAll';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ICurrenciesAll[]>{
    return this.httpClient.get<ICurrenciesAll[]>(urls.currencies)
  }


}
