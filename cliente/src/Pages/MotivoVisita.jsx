import './MotivoVisita.css';
import Form from 'react-bootstrap/Form';
import ButtonPrimary from '../Components/Buttons/ButtonPrimary';
import ListaMotivoVisita from './ListaMotivoVisita';
import fetchService from '../services/fetchService';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';

function Motivo() {

  const [open, openList] = useState(false);

  const hangleDisplay = () => {
    openList(!open);
    let change = document.getElementById("exib");
    change.style.display = !open ? "flex" : "none";
  }

  const handleSearch = () => {
    const item = document.getElementById("search").value;
    fetchService.displayTable(item);
  }
  
  const handleReset = () => {
    fetchService.resetForm()
  }

  const handleValidation = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()){
      form.classList.add('was-validated');
    }
    else{
      form.classList.add('was-validated');
      !document.getElementById("register").disabled ? fetchService.registering() : fetchService.updating();
      form.reset();
    }
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <>
      <div id="block" className="Main-Style">
        <Form id="formRegister" className="Form-Style" onSubmit={handleValidation} noValidate>
          <Row>
            <h1 className="title">Motivo de visita</h1>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Nome visita</Form.Label>
              <Form.Control id="nomeId" minLength={5} maxLength={60} type="text" required/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Paciente</Form.Label>
              <Form.Select id="pacienteId" minLength={3} maxLength={60} aria-label="Default select example" type="text" required>
                <option></option> {/*Algum placeholder talvez?*/}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}> 
              <Form.Label>Endereco</Form.Label>
              <Form.Control id="enderecoId" minLength={5} maxLength={60} type="text" required/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group id="codControl">
              <Form.Label>Código</Form.Label>
              <Form.Control id="codId" type="text"/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Motivo</Form.Label>
              <Form.Control id="motivoId" as="textarea" minLength={10}
                maxLength={255} rows={3} required/>
            </Form.Group>
          </Row>
          <Row className="ButtonBox">
            <Col className="PrimaryGroup">
              <ButtonPrimary id={"register"} type={"submit"} variant={"success"}
                title={"Registrar"}
              />
              <ButtonPrimary id={"update"} type="submit" variant={"warning"}
                title={"Atualizar"} disabled={true}
              />
              <ButtonPrimary type={"reset"} variant={"secondary"} title={"Limpar"}
                anyEvent={handleReset}
              />
            </Col>
            <Col className="SecondaryGroup">
              <ButtonPrimary type={"button"} variant={"secondary"} title={!open ? "Mostrar" : "Esconder"}
                anyEvent={hangleDisplay}
              />
            </Col>
          </Row>
        </Form>
        <div id="exib">
          <div id="alert-message"></div>
          <div className="alignSearch">
            <input id="search" type="number" min="0" className="searchItem" placeholder="Digite um código" onChange={handleSearch}/>
          </div>
          <ListaMotivoVisita/>
        </div>
      </div>
    </>
  );
}

export default Motivo;