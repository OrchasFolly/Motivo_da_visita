import EX_PacientesDB from "../DataBase/EX_PacientesDB.js";
export default class EX_Pacientes {

    #cod;
    #nome_paciente;

    constructor(cod, nome_paciente) {
        this.#cod = cod;
        this.#nome_paciente = nome_paciente
    }

    

    get cod() {
        return this.#cod;
    }

    set cod(newCod) {
        this.#cod = newCod;
    }

    get nome_paciente() {
        return this.#nome_paciente;
    }

    set nome_paciente(newNome) {
        this.#nome_paciente = newNome;
    }

    //formato JSON de um objeto
    toJSON(){
        return {
            "cod": this.#cod,
            "nome_paciente": this.#nome_paciente,
        }
    }

    async consultar(){
        const candDB = new EX_PacientesDB();
        return await candDB.consultar(this);
    }
}