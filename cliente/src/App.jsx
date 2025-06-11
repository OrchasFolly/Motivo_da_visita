import './styles/App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TopBar from './Components/TopBar.jsx'
import Motivo from './Pages/MotivoVisita.jsx';
import AlertMessage from './Components/Alerts/AlertMessage.jsx';

function App() {

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
        integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
        crossorigin="anonymous"
      />
      <TopBar/>
      <div className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Motivo/>}/>
          </Routes>
        </BrowserRouter>
        <AlertMessage/>
      </div>
    </>
  )
}

export default App
