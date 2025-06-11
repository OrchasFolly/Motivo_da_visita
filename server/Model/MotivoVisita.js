import MotivoVisitaDB from "../DataBase/motivoVisitaDB.js";
export default class MotivoVisita {

    #cod;
    #nome_visita;
    #paciente;
    #endereco;
    #motivo;

    constructor(cod, nome_visita, paciente, endereco, motivo) {
        this.#cod = cod;
        this.#nome_visita = nome_visita,
        this.#paciente = paciente,
        this.#endereco = endereco,
        this.#motivo = motivo
    }

    

    get cod() {
        return this.#cod;
    }

    set cod(newCod) {
        this.#cod = newCod;
    }

    get nome_visita() {
        return this.#nome_visita;
    }

    set nome_visita(newNome) {
        this.#nome_visita = newNome;
    }

    get paciente() {
        return this.#paciente;
    }

    set paciente(newPaciente) {
        this.#paciente = newPaciente;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(newEnd) {
        this.#endereco = newEnd;
    }

    get motivo() {
        return this.#motivo;
    }

    set motivo(novoMotivo) {    
        this.#motivo = novoMotivo;
    }

    //formato JSON de um objeto
    toJSON(){
        return {
            "cod": this.#cod,
            "nome_visita": this.#nome_visita,
            "paciente": this.#paciente,
            "endereco": this.#endereco,
            "motivo": this.#motivo
        }
    }

    async gravar(){
        const candDB = new MotivoVisitaDB();
        candDB.gravar(this);
    }

    async alterar(){
        const candDB = new MotivoVisitaDB();
        candDB.alterar(this);
    }

    async excluir(){
        const candDB = new MotivoVisitaDB();
        candDB.excluir(this);
    }

    async consultar(){
        const candDB = new MotivoVisitaDB();
        return await candDB.consultar(this);
    }

    async consultarPelaChave(key){
        const candDB = new MotivoVisitaDB();
        return await candDB.consultarPelaChave(key);
    }
}