import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function Operaciones() {
  const [relacion1, setRelacion1] = React.useState('');
  const [relacion2, setRelacion2] = React.useState('');
  const [union, setUnion] = React.useState('∅');
  const [interseccion, setInterseccion] = React.useState('∅');
  const [composicionR1R2, setComposicionR1R2] = React.useState('∅');
  const [composicionR2R1, setComposicionR2R1] = React.useState('∅');

  const calcularOperaciones = () => {
    // Expresión regular para validar el formato de los pares ordenados
    const pairRegex = /^\(\s*[a-zA-Z0-9]+\s*,\s*[a-zA-Z0-9]+\s*\)$/;

    // Verificar si las relaciones están vacías
    if (relacion1.trim() === '' || relacion2.trim() === '') {
      setUnion('∅');
      setInterseccion('∅');
      setComposicionR1R2('∅');
      setComposicionR2R1('∅');
      alert('Por favor, ingrese las dos relaciones antes de continuar.');
      return;
    }

    // Verificar formato de los pares ordenados en la relación 1
    const isValidRelacion1 = relacion1.split(/\s+/).every(pair => pairRegex.test(pair));
    if (!isValidRelacion1) {
      alert('Formato incorrecto en la relación 1. Por favor, ingrese pares ordenados válidos.');
      return;
    }

    // Verificar formato de los pares ordenados en la relación 2
    const isValidRelacion2 = relacion2.split(/\s+/).every(pair => pairRegex.test(pair));
    if (!isValidRelacion2) {
      alert('Formato incorrecto en la relación 2. Por favor, ingrese pares ordenados válidos.');
      return;
    }

    // Verificar si hay pares ordenados repetidos en la relación 1
    const relacion1Set = new Set(relacion1.trim().split(/\s+/));
    if (relacion1Set.size !== relacion1.trim().split(/\s+/).length) {
      alert('Hay pares ordenados repetidos en la relación 1. Por favor, ingrese pares ordenados únicos.');
      return;
    }

    // Verificar si hay pares ordenados repetidos en la relación 2
    const relacion2Set = new Set(relacion2.trim().split(/\s+/));
    if (relacion2Set.size !== relacion2.trim().split(/\s+/).length) {
      alert('Hay pares ordenados repetidos en la relación 2. Por favor, ingrese pares ordenados únicos.');
      return;
    }

    // Continuar con el cálculo de las operaciones...
    // Separar pares ordenados de la relación 1 por espacios
    const paresR1 = relacion1.trim().split(/\s+/);
    // Separar pares ordenados de la relación 2 por espacios
    const paresR2 = relacion2.trim().split(/\s+/);

    // Unión de relaciones
    const union = [...paresR1, ...paresR2];
    // Intersección de relaciones
    const interseccion = paresR1.filter(parR1 => paresR2.some(parR2 => parR2 === parR1));
    // Composición de relaciones R1 a R2
    const composicionR1R2 = calcularComposicion(paresR1, paresR2);
    // Composición de relaciones R2 a R1
    const composicionR2R1 = calcularComposicion(paresR2, paresR1);

    // Actualizar resultados
    setUnion(`{ ${union.join(', ')} } | Cardinalidad: ${union.length}`);
    setInterseccion(`{ ${interseccion.join(', ')} } | Cardinalidad: ${interseccion.length}`);
    setComposicionR1R2(`{ ${composicionR1R2.join(', ')} } | Cardinalidad: ${composicionR1R2.length}`);
    setComposicionR2R1(`{ ${composicionR2R1.join(', ')} } | Cardinalidad: ${composicionR2R1.length}`);
  };

  const calcularComposicion = (relacion1, relacion2) => {
    const composicion = [];
    relacion1.forEach(parR1 => {
      const [a, b] = parR1.substring(1, parR1.length - 1).split(',');
      relacion2.forEach(parR2 => {
        const [c, d] = parR2.substring(1, parR2.length - 1).split(',');
        if (b === c) {
          composicion.push(`(${a},${d})`);
        }
      });
    });
    return composicion;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" color="#333" align="center" gutterBottom>
        Operaciones de Relaciones
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        Ingrese los pares ordenados de las relaciones separados por espacios.
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          id="relacion1"
          label="Relación 1"
          value={relacion1}
          onChange={e => setRelacion1(e.target.value)}
          fullWidth
          sx={{ mr: 2 }}
        />
        <TextField
          id="relacion2"
          label="Relación 2"
          value={relacion2}
          onChange={e => setRelacion2(e.target.value)}
          fullWidth
          sx={{ ml: 2 }}
        />
      </div>
      <Button variant="contained" onClick={calcularOperaciones} fullWidth sx={{ mt: 2, backgroundColor: "#333" , color: "white"}}>
        Calcular
      </Button>
      <p></p>
  
      <Typography variant="body1" align="center"  sx={{ mb: 2 }}>
        R1: {relacion1 && <span>{`{ ${relacion1} }`}</span>}
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        R2: {relacion2 && <span>{`{ ${relacion2} }`}</span>}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" align="center" gutterBottom >
          Operaciones
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ width: { xs: '90%', md: '45%' }, p: 3, border:0, margin:1, borderRadius: 3, boxShadow: 7 , mb: 2 }}>
            <Typography variant="body1" align="center">Unión</Typography>
            <Typography variant="body2" align="center">(R1 ∪ R2):{union}</Typography>
          </Box > 
          <Box sx={{ width: { xs: '90%', md: '45%' }, p: 3, border:0, margin:1,  borderRadius: 3, boxShadow: 7 , mb: 2 }}>
            <Typography variant="body1" align="center">Intersección</Typography>
            <Typography variant="body2" align="center">(R1 ∩ R2){interseccion}</Typography>
          </Box>
          <Box sx={{ width: { xs: '90%' }, p: 3, border:0, margin:1,  borderRadius: 3, boxShadow: 7 , mb: 2 }}>
            <Typography variant="body1" align="center">Composición (R1 ∘ R2)</Typography>
            <Typography variant="body2" align="center">R1 ∘ R2: {composicionR1R2}</Typography>
          </Box>
          <Box sx={{ width: { xs: '90%' }, p: 3, border:0,margin:1,  borderRadius: 3, boxShadow: 7 , mb: 2 }}>
            <Typography variant="body1" align="center">Composición (R2 ∘ R1)</Typography>
            <Typography variant="body2" align="center">R2 ∘ R1: {composicionR2R1}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Operaciones;
