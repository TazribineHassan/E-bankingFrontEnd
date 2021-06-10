import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private host: string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getTransactions(): Observable<Transaction[] | HttpErrorResponse>{
    return this.http.get<Transaction[]>(`${this.host}/agent/transaction/all`);
  }

  makeTransaction(formData: FormData) : Observable<Transaction | HttpErrorResponse>{
    return this.http.post<Transaction>(`${this.host}/agent/transaction/make`, formData)
  }

  createUserFormData(transaction:Transaction): FormData {
    const formData = new FormData();
    formData.append('nom_verseur', transaction.nom_verseur);
    formData.append('CIN_verseur', transaction.cin_verseur);
    formData.append('num_compte_beneficiaire', transaction.num_compte_beneficiaire);
    formData.append('Montant_versement', transaction.montant + "");
    return formData;
  }
}
