import MotivoVisita from "../Model/MotivoVisita.js"

export default class MotivoVisitaControl{
    // Requisição POST
    gravar(req, res){
        res.type('application/json');

        if(req.method === "POST" && req.is('application/json')){
            const dados = req.body;
            const nome_visita = dados.nome_visita;
            const paciente = dados.paciente;
            const endereco = dados.endereco
            const motivo = dados.motivo;

            if(nome_visita && paciente && endereco &&motivo){
                const cliente = new MotivoVisita(null, nome_visita, paciente, endereco, motivo);
                cliente.gravar().then(() => {
                    res.status(200).json({
                        status: true,
                        message: "Gravado com sucesso"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else{
                res.status(400).json({
                    status: false,
                    message: "Informe todos os dados corretos"
                });
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"Método negado ou não permitido"
            });
        }
    }

    // Requisição PUT
    alterar(req, res){
        res.type('application/json');

        if(req.method === "PUT" && req.is('application/json')){
            const dados = req.body;
            const cod = dados.cod;
            const nome_visita = dados.nome_visita;
            const paciente = dados.paciente;
            const endereco = dados.endereco
            const motivo = dados.motivo;

            if(cod && nome_visita && paciente && endereco && motivo){
                const cliente = new MotivoVisita(cod, nome_visita, paciente, endereco, motivo);
                cliente.alterar().then(() => {
                    res.status(200).json({
                        status: true,
                        message: "Atualizado com sucesso"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else{
                res.status(400).json({
                    status: false,
                    message: "Informe todos os dados corretos"
                });
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"Método negado ou não permitido"
            });
        }
    }

    // Excluir dado
    excluir(req, res){
        res.type('application/json');

        if(req.method === "DELETE" && req.is('application/json')){
            const dados = req.body;
            const cod = dados.cod;

            if(cod){
                const cliente = new MotivoVisita(cod);
                cliente.excluir().then(() => {
                    res.status(200).json({
                        status: true,
                        message: "Deletado com sucesso"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else{
                res.status(400).json({
                    status: false,
                    message: "Informe todos os dados corretos"
                });
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"Método negado ou não permitido"
            });
        }
    }

    // Consultar todos os dados
    consultar(req, res){
        res.type('application/json');

        if(req.method === "GET"){
            const cliente = new MotivoVisita();

            if (req.params.key){
                cliente.consultarPelaChave(req.params.key).then((listaMotivos) => {
                        res.status(200).json(
                            {
                                "status": true,
                                "clients": listaMotivos
                            }
                        );
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else{
                cliente.consultar('').then((listaMotivos) => {
                        res.status(200).json(
                            {
                                "status": true,
                                "clients": listaMotivos
                            }
                        );
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"Método negado ou não permitido"
            });
        }
    }
}