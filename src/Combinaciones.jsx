import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function Combinaciones() {
  const [elementos, setElementos] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [combinaciones, setCombinaciones] = useState([]);
  const [permutaciones, setPermutaciones] = useState([]);

  const generarCombinaciones = () => {
    // Validar las entradas de usuario
    if (!elementos.trim() || !cantidad.trim()) {
      alert('Por favor, ingrese los elementos y la cantidad.');
      return;
    }

    const elementosArray = elementos.split(',').map(item => item.trim());
    const cantidadNum = parseInt(cantidad);

    if (isNaN(cantidadNum) || cantidadNum <= 0 || cantidadNum > elementosArray.length) {
      alert('La cantidad debe ser un número válido dentro del rango de los elementos.');
      return;
    }

    // Generar combinaciones
    const combinacionesResult = generateCombinations(elementosArray, cantidadNum);
    setCombinaciones(combinacionesResult);
  };

  const generarPermutaciones = () => {
    // Validar las entradas de usuario
    if (!elementos.trim() || !cantidad.trim()) {
      alert('Por favor, ingrese los elementos y la cantidad.');
      return;
    }

    const elementosArray = elementos.split(',').map(item => item.trim());
    const cantidadNum = parseInt(cantidad);

    if (isNaN(cantidadNum) || cantidadNum <= 0 || cantidadNum > elementosArray.length) {
      alert('La cantidad debe ser un número válido dentro del rango de los elementos.');
      return;
    }

    // Generar permutaciones
    const permutacionesResult = generatePermutations(elementosArray, cantidadNum);
    setPermutaciones(permutacionesResult);
  };

  const generateCombinations = (elements, k) => {
    const combinations = [];

    const backtrack = (start = 0, current = []) => {
      if (current.length === k) {
        combinations.push([...current]);
        return;
      }

      for (let i = start; i < elements.length; i++) {
        current.push(elements[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    };

    backtrack();
    return combinations;
  };

  const generatePermutations = (elements, k) => {
    const permutations = [];

    const backtrack = (current = []) => {
      if (current.length === k) {
        permutations.push([...current]);
        return;
      }

      for (let i = 0; i < elements.length; i++) {
        if (!current.includes(elements[i])) {
          current.push(elements[i]);
          backtrack(current);
          current.pop();
        }
      }
    };

    backtrack();
    return permutations;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" color="textPrimary" align="center" gutterBottom>
        Combinaciones y Permutaciones
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
        Ingrese los elementos separados por comas y la cantidad deseada para generar combinaciones y permutaciones.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <TextField
          label="Elementos"
          value={elementos}
          onChange={(e) => setElementos(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ mr: 1 }}
        />
        <TextField
          label="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ ml: 1 }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" onClick={generarCombinaciones} sx={{ mr: 1 , backgroundColor:"#333" }}>
          Combinaciones
        </Button>
        <Button variant="contained" onClick={generarPermutaciones} sx={{ mr: 1,  backgroundColor:"#333"}}>
          Permutaciones
        </Button>
      </Box>
      {combinaciones.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" color="textPrimary" align="center" gutterBottom>
            Combinaciones ({combinaciones.length})
          </Typography>
          <Typography variant="body2" align="center">
            {combinaciones.map((combination, index) => (
              <span key={index}>({combination.join(', ')}) </span>
            ))}
          </Typography>
        </Box>
      )}
      {permutaciones.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" color="textPrimary" align="center" gutterBottom>
            Permutaciones ({permutaciones.length})
          </Typography>
          <Typography variant="body2" align="center">
            {permutaciones.map((permutation, index) => (
              <span key={index}>({permutation.join(', ')}) </span>
            ))}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h6" align="center" gutterBottom>
          En construcción...
        </Typography>
        <img src="https://pbs.twimg.com/media/ChFN_m1VEAEp8af.jpg" alt="a" style={{ maxWidth: '50%', height: 'auto' }} />
      </Box>
    </Container>
     
  );
}

export default Combinaciones;
