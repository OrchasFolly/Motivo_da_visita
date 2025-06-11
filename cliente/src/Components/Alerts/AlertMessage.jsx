import './AlertMessage.css'
import Alert from 'react-bootstrap/Alert';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import fetchService from '../../services/fetchService';

function AlertMessage() {

  const handleReset = () => {
    fetchService.resetForm()
  }

  const handleDelete = () => {
    fetchService.excluindo()
    fetchService.resetForm()
  }

  return (
    <>
        <Alert id="deleteMessage" className="alertMsg" variant="danger">
            <Alert.Heading>Warning</Alert.Heading>
            <p>
            Deseja realmente excluir?
            </p>
            <hr />
            <div className="d-flex justify-content-end">
                <ButtonPrimary type={"button"} variant={"secondary"} title={"Cancel"}
                    anyEvent={handleReset}
                />
                <ButtonPrimary type={"button"} variant={"danger"} title={"Excluir"}
                    anyEvent={handleDelete}
                />
            </div>
        </Alert>
    </>
  );
}

export default AlertMessage;