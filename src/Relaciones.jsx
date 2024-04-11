import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RelacionAxB from './RelacionAxB'; // Importa el componente RelacionAxB
import RelacionAxA from './RelacionAxA'; // Importa el componente RelacionAxA
import RelacionBxB from './RelacionBxB'; // Importa el componente RelacionBxB
import Operaciones from './Operaciones'; // Importa el componente Operaciones

function Relaciones() {
  const [selectedOption, setSelectedOption] = useState(null); // Estado para almacenar la opción seleccionada

  // Función para manejar la selección de opción
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h3" color="#333" align="center" gutterBottom>
        Calculadora de Relaciones
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        ¿Qué quieres calcular?
      </Typography>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {/* Botones para seleccionar el tipo de relación */}
        <Button variant="contained" onClick={() => handleOptionSelect('Operaciones')} sx={{ mt: 2, mr: 3, backgroundColor:"purple"}}>
        Operaciones
        </Button>
        <Button variant="contained" onClick={() => handleOptionSelect('AXB')} sx={{ mt: 2, mr: 3, backgroundColor:"green"}}>
        R: A → B
        </Button>
        <Button variant="contained" onClick={() => handleOptionSelect('AXA')} sx={{ mt: 2, mr: 3, backgroundColor:"#000" }}>
        R: A → A
        </Button>
        <Button variant="contained" onClick={() => handleOptionSelect('BXB')} sx={{ mt: 2 , backgroundColor:"#000"}}>
        R: B → B 
        </Button>
      </div>
      {/* Renderizado condicional del componente seleccionado */}
      {selectedOption === 'Operaciones' && <Operaciones/>}
      {selectedOption === 'AXB' && <RelacionAxB />}
      {selectedOption === 'AXA' && <RelacionAxA />}
      {selectedOption === 'BXB' && <RelacionBxB />}
      <p></p>

    </Container>

  );
}

export default Relaciones;
