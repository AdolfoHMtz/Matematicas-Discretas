import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function Aritmetica() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [modulo, setModulo] = useState('');
  const [resultado, setResultado] = useState('');

  // Función para verificar la equivalencia de los números en módulo
  const verificarEquivalencia = () => {
    const num1 = parseInt(numero1);
    const num2 = parseInt(numero2);
    const mod = parseInt(modulo);

    // Verificar si los valores ingresados son números válidos
    if (isNaN(num1) || isNaN(num2) || isNaN(mod)) {
      setResultado('Por favor, ingrese números válidos.');
      return;
    }

    // Calcular la equivalencia en módulo
    const equivalencia = num1 % mod === num2 % mod;

    // Mostrar el resultado
    setResultado(`[${num1 % mod}] ≡ [${num2 % mod}] es ${equivalencia ? 'Verdadero' : 'Falso'}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Aritmética Modular
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TextField
          id="numero1"
          label="Número 1"
          value={numero1}
          onChange={(e) => setNumero1(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Typography variant="h5">≡</Typography>
        <TextField
          id="numero2"
          label="Número 2"
          value={numero2}
          onChange={(e) => setNumero2(e.target.value)}
          sx={{ mx: 1 }}
        />
        <Typography variant="h5">MOD</Typography>
        <TextField
          id="modulo"
          label="Módulo"
          value={modulo}
          onChange={(e) => setModulo(e.target.value)}
          sx={{ ml: 1 }}
        />
      </div>
      <Button variant="contained" onClick={verificarEquivalencia} fullWidth sx={{ mt: 2, backgroundColor: "#333", color: "white" }}>
        Verificar Equivalencia
      </Button>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Resultado: <br />
        {resultado}
      </Typography>
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
      </Typography>
    </Container>
  );
}

export default Aritmetica;
