import EX_Pacientes from "../Model/EX_Pacientes.js"

export default class EX_PacientesControl{
    // Consultar todos os dados
    consultar(req, res){
        res.type('application/json');

        if(req.method === "GET"){
            const cliente = new EX_Pacientes();
            
            cliente.consultar('').then((listaNomes) => {
                    res.status(200).json(
                        {
                            "status": true,
                            "clients": listaNomes
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
            res.status(400).json({
                status:false,
                message:"Método negado ou não permitido"
            });
        }
    }
}