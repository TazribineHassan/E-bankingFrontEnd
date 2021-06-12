import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facture } from '../models/facture';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class ClientTransactionsService {
  private host: string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getTransactions(): Observable<Transaction[] | HttpErrorResponse>{
    return this.http.get<Transaction[]>(`${this.host}/client/transaction/all`);
  }

  makeVirement(formData: FormData) : Observable< any | HttpErrorResponse>{
    return this.http.post<any>(`${this.host}/client/virement/make`, formData)
  }

  confirmeVirement(code: number) : Observable<Transaction | HttpErrorResponse>{
    return this.http.post<Transaction>(`${this.host}/client/virement/verify/` + code, null)
  }

  searchPayment(code: string) : Observable<number | HttpErrorResponse>{
    return this.http.get<number>(`${this.host}/client/payement/check/` + code)
  }

  makePayement(formData: FormData) : Observable<Transaction | HttpErrorResponse>{
    return this.http.post<Transaction>(`${this.host}/client/payement/make`, formData)
  }

  confirmePayement(code: String) : Observable<String | HttpErrorResponse>{
    return this.http.post<String>(`${this.host}/client/payement/verify/` + code, null)
  }


  createVirementFormData(transaction:Transaction): FormData {
    const formData = new FormData();
    formData.append('num_compte_beneficiaire', transaction.num_compte_beneficiaire);
    formData.append('Montant_virement', transaction.montant + "");
    return formData;
  }

  createPayementFormData(facture: Facture): FormData {
    const formData = new FormData();
    formData.append('num_facture', facture.code);
    formData.append('Montant_virement', facture.montant + "");
    return formData;
  }

}
