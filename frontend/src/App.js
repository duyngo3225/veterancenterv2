// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SecurePage from './components/checklist';
import Navigation from './components/navigation';

const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/secure"
            element={isAuthenticated() ? <SecurePage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
