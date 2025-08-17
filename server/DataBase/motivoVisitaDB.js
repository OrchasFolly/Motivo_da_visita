import conection from "./connectMySQL.js";
import MotivoVisita from "../Model/MotivoVisita.js";
export default class MotivoVisitaDB{

    constructor(){
        this.init();
    }

    async init(){
        const conexao = await conection();
        try {
            const sql = `CREATE TABLE IF NOT EXISTS motivo_de_visita (
                cod INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                nome_visita VARCHAR(255) NOT NULL,
                paciente VARCHAR(255) NOT NULL,
                endereco VARCHAR(255) NOT NULL,
                motivo VARCHAR(255) NOT NULL,

                constraint fkNomePaciente foreign key (paciente)
		            references pacientes(cod)
            )`;
            await conexao.execute(sql);
        } catch ( erro ) {
            console.log("Erro ao iniciar a tabela motivo_de_visita:" + erro);
        }
    }

    async gravar(cliente){
        if (cliente instanceof MotivoVisita){
            const conexao = await conection();
            try {
                await conexao.beginTransaction();
                const sql = `INSERT INTO motivo_de_visita (nome_visita, paciente, endereco, motivo)
                            VALUES (?, ?, ?, ?)`;
                const parametros = [
                    cliente.nome_visita,
                    cliente.paciente,
                    cliente.endereco,
                    cliente.motivo
                ];

                await conexao.execute(sql, parametros);
                await conexao.commit();
                await conexao.release();
            } catch ( erro ) {
                conexao.rollback();
                console.log(erro);
            }
        }
    }

    async alterar(cliente){
        if (cliente instanceof MotivoVisita){
            const conexao = await conection();
            try {
                await conexao.beginTransaction();
                const sql = `UPDATE motivo_de_visita SET 
                            nome_visita = ?, paciente = ?, endereco = ?, motivo = ?
                            WHERE cod = ?`;
                const parametros = [
                    cliente.nome_visita,
                    cliente.paciente,
                    cliente.endereco,
                    cliente.motivo,
                    cliente.cod
                ];
                await conexao.execute(sql, parametros);
                await conexao.commit();
                await conexao.release();
            } catch ( erro ) {
                conexao.rollback();
                console.log(erro);
            }
        }
    }

    async excluir(cliente){
        if (cliente instanceof MotivoVisita){
            const conexao = await conection();
            try {
                await conexao.beginTransaction();
                const sql = `DELETE FROM motivo_de_visita WHERE cod = ?`;
                const parametros = [cliente.cod];
                await conexao.execute(sql, parametros);
                await conexao.commit();
                await conexao.release();
            } catch ( erro ) {
                conexao.rollback();
                console.log(erro);
            }
        }
    }

    async consultar(){
        const conexao = await conection();
        try {
            const sql = `SELECT * FROM motivo_de_visita ORDER BY nome_visita`;
            const [registros, campos] = await conexao.execute(sql);
            await conexao.release();
            let listaMotivos = [];
            for (const registro of registros){
                const cliente = new MotivoVisita(registro.cod,
                                            registro.nome_visita,
                                            registro.paciente,
                                            registro.endereco,
                                            registro.motivo
                                            );
                listaMotivos.push(cliente);
                                        
            }
            return listaMotivos;
        } catch ( erro ) {
            console.log(erro);
        }
    }
    
    async consultarPelaChave(key){
        const conexao = await conection();
        try {
            const sql = `SELECT * FROM motivo_de_visita WHERE cod LIKE '${key}%' OR paciente LIKE '${key}%'`;
            const [registros, campos] = await conexao.execute(sql, [key]);
            await conexao.release();
            let listaMotivos = [];
            for (const registro of registros){
                const cliente = new MotivoVisita(registro.cod,
                                            registro.nome_visita,
                                            registro.paciente,
                                            registro.endereco,
                                            registro.motivo
                                            );
                listaMotivos.push(cliente);
                                        
            }
            return listaMotivos;
        } catch ( erro ) {
            console.log(erro);
        }
    }
}