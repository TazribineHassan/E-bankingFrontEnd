import { Agence } from "./agence";
import { Banque } from "./banque";
import { Compte } from "./compte";
import { Transaction } from "./transaction";

export class User {
    public  id : number;
    public  cin : string;
    public  nom : string;
    public  prenom : string;
    public  email : string;
    public  type : string;
    public  code_agent : string;
    public  num_tele : string;
    public  profileImageUrl : string;
    public  date_naissance : Date;
    public  loginDateDisplay : Date;
    public  joinDate : Date;
    public  username : string;
    public  roles: string;
    public  authorities : string[];
    public  active : boolean;
    public  notLocked : boolean;
    public agence : Agence;
    public compte : Compte;
    public transactions : Transaction[];

    constructor() {
        this.id = 0;
        this.cin = '';
        this.nom = '';
        this.prenom = '';
        this.username = '';
        this.email = '';
        this.type = '';
        this.code_agent = '';
        this.num_tele = '';
        this.profileImageUrl = '';
        this.date_naissance = new Date();
        this.loginDateDisplay = new Date();
        this.joinDate = new Date();
        this.roles = '';
        this.authorities = [];
        this.transactions = [];
        this.active = false;
        this.notLocked = false;
        this.agence = new Agence();
        this.compte = new Compte();
    }
}