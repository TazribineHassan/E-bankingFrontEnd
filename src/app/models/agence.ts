import { Adresse } from "./address";
import { Banque } from "./banque";

export class Agence {
    public  id : number = 0;
    public  nom : string = "";
    public  code : string = "";
    public banque : Banque = new Banque();
    public num_tele : string = "";
    public horaire_debut: string = "";
    public horaire_fin: string = "";
    public adresse: Adresse = new Adresse();
    
    constructor(){}
}