import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Aritmetica() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [modulo, setModulo] = useState('');
  const [resultado, setResultado] = useState('');

  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [equationModulo, setEquationModulo] = useState('');
  const [equationResultado, setEquationResultado] = useState('');
  const [operation, setOperation] = useState('+');

  // Función para verificar la equivalencia de los números en módulo
  const verificarEquivalencia = () => {
    const num1 = parseInt(numero1);
    const num2 = parseInt(numero2);
    const mod = parseInt(modulo);

    if (isNaN(num1) || isNaN(num2) || isNaN(mod)) {
      setResultado('Por favor, ingrese números válidos.');
      return;
    }

    const equivalencia = num1 % mod === num2 % mod;
    setResultado(`[${num1 % mod}] ≡ [${num2 % mod}] es ${equivalencia ? 'Verdadero' : 'Falso'}`);
  };

  // Función para encontrar el inverso multiplicativo
  const modInverse = (a, m) => {
    const m0 = m;
    let y = 0;
    let x = 1;

    if (m === 1) return 0;

    while (a > 1) {
      const q = Math.floor(a / m);
      let t = m;

      m = a % m;
      a = t;
      t = y;

      y = x - q * y;
      x = t;
    }

    if (x < 0) x += m0;

    return x;
  };

  // Función para resolver ecuaciones de la forma ax + b ≡ c MOD m o ax - b ≡ c MOD m
  const resolverEcuacion = () => {
    const A = parseInt(a);
    const B = parseInt(b);
    const C = parseInt(c);
    const mod = parseInt(equationModulo);

    if (isNaN(A) || isNaN(B) || isNaN(C) || isNaN(mod)) {
      setEquationResultado('Por favor, ingrese números válidos.');
      return;
    }

    const aMod = A % mod;
    const bMod = B % mod;
    const cMod = C % mod;

    // Resolver la ecuación ax + b ≡ c (mod m) o ax - b ≡ c (mod m)
    const newC = (operation === '+') ? (cMod - bMod + mod) % mod : (cMod + bMod) % mod;
    const invA = modInverse(aMod, mod);
    if (invA === 0) {
      setEquationResultado('No existe solución, ya que el inverso multiplicativo no existe.');
      return;
    }

    const x = (newC * invA) % mod;
    const equationSolution = `x ≡ [${x}]`;
    const generalSolution = `C.S: {x: ${mod}k + ${x}, k ∈ Z}`;

    setEquationResultado(`${equationSolution}\n${generalSolution}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Aritmética Modular
      </Typography>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
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
      <Button variant="contained" onClick={verificarEquivalencia} fullWidth sx={{ mb: 2, backgroundColor: "#333", color: "white" }}>
        Verificar Equivalencia
      </Button>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Resultado: <br />
        {resultado}
      </Typography>

      <Typography variant="h4" align="center" gutterBottom>
        Resolver Ecuación Modular
      </Typography>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          id="a"
          label="A"
          value={a}
          onChange={(e) => setA(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Typography variant="h5">x</Typography>
        <FormControl sx={{ mx: 1 }}>
          <InputLabel id="operation-label">Operación</InputLabel>
          <Select
            labelId="operation-label"
            id="operation"
            value={operation}
            label="Operación"
            onChange={(e) => setOperation(e.target.value)}
          >
            <MenuItem value="+">+</MenuItem>
            <MenuItem value="-">-</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="b"
          label="B"
          value={b}
          onChange={(e) => setB(e.target.value)}
          sx={{ mx: 1 }}
        />
        <Typography variant="h5">≡</Typography>
        <TextField
          id="c"
          label="C"
          value={c}
          onChange={(e) => setC(e.target.value)}
          sx={{ mx: 1 }}
        />
        <Typography variant="h5">MOD</Typography>
        <TextField
          id="equationModulo"
          label="Módulo"
          value={equationModulo}
          onChange={(e) => setEquationModulo(e.target.value)}
          sx={{ ml: 1 }}
        />
      </div>
      <Button variant="contained" onClick={resolverEcuacion} fullWidth sx={{ mb: 2, backgroundColor: "#333", color: "white" }}>
        Resolver Ecuación
      </Button>
      <Typography variant="h6" align="center" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
        Resultado: <br />
        {equationResultado}
      </Typography>
    </Container>
  );
}
export default Aritmetica;