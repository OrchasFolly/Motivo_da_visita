import conection from "./connectMySQL.js";
import MotivoVisita from "../Model/EX_Pacientes.js";
export default class EX_PacientesDB{

    constructor(){
        this.init();
    }

    async init(){
        try {
            const conexao = await conection();
            const sql = `CREATE TABLE IF NOT EXISTS pacientes (
                cod INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                nome_paciente VARCHAR(255) NOT NULL
            )`;
            await conexao.execute(sql);
        } catch ( erro ) {
            console.log("Erro ao iniciar a tabela pacientes:" + erro);
        }
    }

    async consultar(){
        try {
            const conexao = await conection();
            const sql = `SELECT * FROM pacientes ORDER BY nome_paciente`;
            const [registros, campos] = await conexao.execute(sql);
            await conexao.release();
            let listaNomes = [];
            for (const registro of registros){
                const cliente = new MotivoVisita(registro.cod,
                                            registro.nome_paciente,
                                            );
                listaNomes.push(cliente);
                                        
            }
            return listaNomes;
        } catch ( erro ) {
            console.log(erro);
        }
    }
}