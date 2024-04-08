import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import NavBar from './Navbar';
import Subconjuntos from './Subconjuntos';
import Relaciones from './Relaciones';
import Combinaciones from './Combinaciones';
import Footer from './Footer';
import Universo from './Universo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <CssBaseline />
      <NavBar/>
      <Routes>
        <Route path="/" exact element={<Subconjuntos />} />
        <Route path="/Universo" element={<Universo />} />
        <Route path="/Relaciones" element={<Relaciones/>} />
        <Route path="/Combinaciones" element={<Combinaciones />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
