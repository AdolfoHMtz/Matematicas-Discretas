import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Combinaciones() {
  const [elementos, setElementos] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [combinaciones, setCombinaciones] = useState([]);
  const [permutaciones, setPermutaciones] = useState([]);

  // Función para generar combinaciones
  const generarCombinaciones = () => {
    // Validar las entradas de usuario
    if (!elementos.trim() || !cantidad.trim()) {
      alert('Por favor, ingrese los elementos y la cantidad.');
      return;
    }

    // Convertir los elementos ingresados en un array y eliminar los espacios en blanco
    const elementosArray = elementos.split(',').map(item => item.trim());
    const cantidadNum = parseInt(cantidad);

    // Validar la cantidad ingresada
    if (isNaN(cantidadNum) || cantidadNum <= 0 || cantidadNum > elementosArray.length) {
      alert('La cantidad debe ser un número válido dentro del rango de los elementos.');
      return;
    }

    // Generar combinaciones
    const combinacionesResult = generarCombinacionesHelper(elementosArray, cantidadNum);
    setCombinaciones(combinacionesResult);
  };

  // Función para generar permutaciones
  const generarPermutaciones = () => {
    // Validar las entradas de usuario
    if (!elementos.trim() || !cantidad.trim()) {
      alert('Por favor, ingrese los elementos y la cantidad.');
      return;
    }

    // Convertir los elementos ingresados en un array y eliminar los espacios en blanco
    const elementosArray = elementos.split(',').map(item => item.trim());
    const cantidadNum = parseInt(cantidad);

    // Validar la cantidad ingresada
    if (isNaN(cantidadNum) || cantidadNum <= 0 || cantidadNum > elementosArray.length) {
      alert('La cantidad debe ser un número válido dentro del rango de los elementos.');
      return;
    }

    // Generar permutaciones
    const permutacionesResult = generarPermutacionesHelper(elementosArray, cantidadNum);
    setPermutaciones(permutacionesResult);
  };

  // Función para generar combinaciones (algoritmo de combinación)
  const generarCombinacionesHelper = (elementos, k) => {
    const combinaciones = [];

    // Función recursiva para encontrar las combinaciones
    const backtrack = (start = 0, current = []) => {
      if (current.length === k) {
        combinaciones.push([...current]);
        return;
      }

      for (let i = start; i < elementos.length; i++) {
        current.push(elementos[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    };

    backtrack();
    return combinaciones;
  };

  // Función para generar permutaciones (algoritmo de permutación)
  const generarPermutacionesHelper = (elementos, k) => {
    const permutaciones = [];

    // Función recursiva para encontrar las permutaciones
    const backtrack = (current = []) => {
      if (current.length === k) {
        permutaciones.push([...current]);
        return;
      }

      for (let i = 0; i < elementos.length; i++) {
        if (!current.includes(elementos[i])) {
          current.push(elementos[i]);
          backtrack(current);
          current.pop();
        }
      }
    };

    backtrack();
    return permutaciones;
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
        <Button variant="contained" onClick={generarCombinaciones} sx={{ mr: 4 , backgroundColor:"#333" }}>
          Combinaciones
        </Button>
        <Button variant="contained" onClick={generarPermutaciones} sx={{ mr: 4,  backgroundColor:"#333"}}>
          Permutaciones
        </Button>
      </Box>
      {combinaciones.length > 0 && (
        <Card variant="outlined" sx={{ mb: 4, border: "1px solid #333" }} xs={12} md={12}>
          <CardContent>
            <Typography variant="h5" color="textPrimary" align="center" gutterBottom>
              Combinaciones ({combinaciones.length})
            </Typography>
            <Typography variant="body2" align="center">
              Fórmula para calcular combinaciones: <br />
              <strong>C(n, k) = n! / (k! * (n - k)!)</strong>
            </Typography>
            <p></p>
            <Typography variant="body2" align="center">
              {combinaciones.map((combination, index) => (
                <span key={index}>({combination.join(', ')}) </span>
              ))}
            </Typography>
          </CardContent>
        </Card>
      )}
      {permutaciones.length > 0 && (
        <Card variant="outlined" sx={{ mb: 4, border: "1px solid #333" }} xs={12} md={12}>
          <CardContent>
            <Typography variant="h5" color="textPrimary" align="center" gutterBottom>
              Permutaciones ({permutaciones.length})
            </Typography>
            <Typography variant="body2" align="center">
              Fórmula para calcular permutaciones: <br />
              <strong>P(n, k) = n! / (n - k)!</strong>
            </Typography>
            <p></p>
            <Typography variant="body2" align="center">
              {permutaciones.map((permutation, index) => (
                <span key={index}>({permutation.join(', ')}) </span>
              ))}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container> 
  );
}

export default Combinaciones;
