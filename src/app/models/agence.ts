import { Banque } from "./banque";

export class Agence {
    public  id : number = 0;
    public  nom : string = "";
    public banque : Banque = new Banque();
    constructor(){}
}