import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext'; 
import { msalInstance } from './components/msalInstance';
import Login from './components/Login';
import SecurePage from './components/checklist';
import Navigation from './components/navigation';
import './App.css';
import ScanTest from './components/scanTest';
import Testing from './components/testing';

const App = () => {
  const [hasScanned, setHasScanned] = useState(false); // Track if scan has been triggered

  useEffect(() => {
    const initializeMsal = async () => {
      await msalInstance.initialize();
    };
    initializeMsal();
  }, []);

  const handleScanClick = () => {
    setHasScanned(true); // Trigger the scan when the button is clicked
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/secure" 
              element={
                <ProtectedRoute>
                  <Navigation /> 
                  <SecurePage />
                  <button onClick={handleScanClick}>Scan Documents</button> {/* Button to trigger scan */}
                  {hasScanned && <ScanTest />} {/* Render ScanTest only after scan */}
                  <Testing />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default App;
