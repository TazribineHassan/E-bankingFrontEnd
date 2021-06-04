export class User {
    public  id : number;
    public  cin : string;
    public  nom : string;
    public  prenom : string;
    public  email : string;
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

    constructor() {
        this.id = 0;
        this.cin = '';
        this.nom = '';
        this.prenom = '';
        this.username = '';
        this.email = '';
        this.num_tele = '';
        this.profileImageUrl = '';
        this.date_naissance = new Date();
        this.loginDateDisplay = new Date();
        this.joinDate = new Date();
        this.roles = '';
        this.authorities = [];
        this.active = false;
        this.notLocked = false;

    }
}