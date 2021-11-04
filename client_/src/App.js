import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes';
import { Navbar } from './components/Navbar';
import 'materialize-css';

function App() {
  const { token, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div>
          <h1>{routes}</h1>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
