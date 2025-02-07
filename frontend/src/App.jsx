import Auth from './components/Auth'
import {BrowserRouter as Router, Routes,Route }from 'react-router-dom'
import Dashboard from './components/Dashboard';
import { UserProvider } from "./utils/UserContext";
import ProtectedRoute from './utils/ProtectedRoutes';

function App() {
  

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App
