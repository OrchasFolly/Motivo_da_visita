import { Router } from "express";
import MotivoVisitaControl from "../Controller/motivoVisitaControl.js";

const rotaMotivoVisita = new Router();
const motivoVisitaControl = new MotivoVisitaControl();

// Definição de endpoints do candidato
rotaMotivoVisita.post('/', motivoVisitaControl.gravar)
.put('/',motivoVisitaControl.alterar)
.delete('/',motivoVisitaControl.excluir)
.get('/',motivoVisitaControl.consultar)
.get('/:key',motivoVisitaControl.consultar);

export default rotaMotivoVisita;

