import { Router } from "express";
import EX_PacientesControl from "../Controller/EX_PacientesControl.js";

const rotaPacientes = new Router();
const ex_pacientesControl = new EX_PacientesControl();

// Definição de endpoints do candidato
rotaPacientes.get('/',ex_pacientesControl.consultar)

export default rotaPacientes;