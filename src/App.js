import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginModal from './components/loginModal';
import Home from './Home';
import NewTransaction from './NewTransaction';

function App() {
  return (
    <div>
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
    </div>
  );
}

export function ErrorPage() {
  return <h4>Ha ocurrido un error, intentelo denuevo!</h4>;
}

export const PrivateRoute = ({ children }) => {
  return localStorage.getItem('userToken') ? children : <Navigate to="/" />;
};

export default App;
