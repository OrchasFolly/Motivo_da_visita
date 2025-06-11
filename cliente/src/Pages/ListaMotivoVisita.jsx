import './ListaMotivoVisita.css';
import ButtonPrimary from '../Components/Buttons/ButtonPrimary';
import { RxReload } from 'react-icons/rx';
import fetchService from '../services/fetchService';

function ListaCancelamento() {
  
  const handleLoad = () => {
    fetchService.exibindoTabela()
  }
  handleLoad()

  return (
    <>
      <table id="list" className="tableStyle App-header-list">
        <tbody id="get-tab" className="tabScroll">
        </tbody>
        <tfoot>
          <tr>
            <td>
              <ButtonPrimary
                type={"button"}
                title={<RxReload/>}
                variant={"outline-dark"}
                anyEvent={handleLoad}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default ListaCancelamento;