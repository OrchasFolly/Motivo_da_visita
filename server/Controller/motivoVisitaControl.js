import MotivoVisita from "../Model/MotivoVisita.js"

export default class MotivoVisitaControl{
    // Requisição POST
    gravar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome_visita = dados.nome_visita;
            const paciente = dados.paciente;
            const endereco = dados.endereco
            const motivo = dados.motivo;

            if(nome_visita && paciente && endereco &&motivo){
                const cliente = new MotivoVisita(null, nome_visita, paciente, endereco, motivo);
                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Gravado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Requisição PUT
    alterar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cod = dados.cod;
            const nome_visita = dados.nome_visita;
            const paciente = dados.paciente;
            const endereco = dados.endereco
            const motivo = dados.motivo;

            if(cod && nome_visita && paciente && endereco && motivo){
                const cliente = new MotivoVisita(cod, nome_visita, paciente, endereco, motivo);
                cliente.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Atualizado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Excluir dado
    excluir(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cod = dados.cod;

            if(cod){
                const cliente = new MotivoVisita(cod);
                cliente.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Deletado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Consultar todos os dados
    consultar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "GET"){
            const cliente = new MotivoVisita();

            if (requisicao.params.key){
                cliente.consultarPelaChave(requisicao.params.key).then((listaMotivos) => {
                        resposta.status(200).json(
                            {
                                "status": true,
                                "clientes": listaMotivos
                            }
                        );
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                cliente.consultar('').then((listaMotivos) => {
                        resposta.status(200).json(
                            {
                                "status": true,
                                "clientes": listaMotivos
                            }
                        );
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }
}