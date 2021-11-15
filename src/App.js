import './App.css';
import {Routes, Route} from 'react-router-dom';
import LoginModal from './components/loginModal';
import Home from './Home';
import NewTransaction from './NewTransaction';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LoginModal/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/newTransaction" element={<NewTransaction/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export function ErrorPage (){
  return (
    <h4>Ha ocurrido un error, intentelo denuevo!</h4>
  );
}

export default App;
