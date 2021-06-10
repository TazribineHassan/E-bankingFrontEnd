export class Transaction{
    public id: number = 0;
    public type_transaction: string = "";
    public date_transaction: Date = new Date();
    public cin_verseur: string = "";
    public nom_verseur: string = "";
    public num_compte: string = "";
    public num_compte_source: string = "";
    public num_compte_beneficiaire: string = "";
    public code_facture: string = "";
    public montant: number = 0;
    public montant_facture: number = 0;

    constructor(){}
}