import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import Home from './views/Home';
import NewTransaction from './views/NewTransaction';
import NavBar from './components/NavBar';
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/auth/authActions';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        {/* Public */}
        <Route exact path="/" element={<LoginModal />} />
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
