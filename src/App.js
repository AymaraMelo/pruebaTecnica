import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import Home from './views/Home';
import NewTransaction from './views/NewTransaction';
import Header from './components/Header';
import Register from './views/Register';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        {/* Public */}
        <Route exact path="/" element={<LoginModal />} />
        <Route path="/register" element={<Register />} />
        {/* Private */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/newTransaction"
          element={
            <PrivateRoute>
              <NewTransaction />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export function ErrorPage() {
  return <h4>Ha ocurrido un error, intentelo denuevo!</h4>;
}

export const PrivateRoute = ({ children }) => {
  return localStorage.getItem('userToken') ? children : <Navigate to="/" />;
};

export default App;
