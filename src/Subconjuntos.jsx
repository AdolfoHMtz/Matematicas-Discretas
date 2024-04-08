import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function Subconjuntos() {
  const [setA, setSetA] = React.useState('');
  const [setB, setSetB] = React.useState('');
  const [resultA, setResultA] = React.useState('(Conjuntos vacíos)');
  const [resultB, setResultB] = React.useState('(Conjuntos vacíos)');
  const [resultUnion, setResultUnion] = React.useState('∅');
  const [resultIntersection, setResultIntersection] = React.useState('∅');
  const [resultDifferenceAB, setResultDifferenceAB] = React.useState('∅');
  const [resultDifferenceBA, setResultDifferenceBA] = React.useState('∅');
  const [resultSymmetricDifference, setResultSymmetricDifference] = React.useState('∅');
  const [resultPowerSetA, setResultPowerSetA] = React.useState('∅');
  const [resultPowerSetB, setResultPowerSetB] = React.useState('∅');
  const [resultCartesianProduct, setResultCartesianProduct] = React.useState('∅');

  const calculate = () => {
    // Verificar si los conjuntos están vacíos
    if (setA.trim() === '' || setB.trim() === '') {
      setResultA('(Conjuntos vacíos)');
      setResultB('(Conjuntos vacíos)');
      setResultUnion('∅');
      setResultIntersection('∅');
      setResultDifferenceAB('∅');
      setResultDifferenceBA('∅');
      setResultSymmetricDifference('∅');
      setResultPowerSetA('∅');
      setResultPowerSetB('∅');
      setResultCartesianProduct('∅');
      return;
    }

    // Función para filtrar elementos duplicados
    const unique = (array) => {
      return array.filter((item, index) => array.indexOf(item) === index);
    };

    // Separar elementos del conjunto A por comas y filtrar elementos duplicados
    const arrayA = unique(setA.split(',').map(item => item.trim()));
    // Separar elementos del conjunto B por comas y filtrar elementos duplicados
    const arrayB = unique(setB.split(',').map(item => item.trim()));
    
    // Verificar si A es subconjunto de B
    const isASubsetOfB = arrayA.every(item => arrayB.includes(item));
    // Verificar si B es subconjunto de A
    const isBSubsetOfA = arrayB.every(item => arrayA.includes(item));
    // Unión de A y B
    const union = unique([...arrayA, ...arrayB]);
    // Intersección de A y B
    const intersection = arrayA.filter(item => arrayB.includes(item));
    // Diferencia de A - B
    const differenceAB = arrayA.filter(item => !arrayB.includes(item));
    // Diferencia de B - A
    const differenceBA = arrayB.filter(item => !arrayA.includes(item));
    // Diferencia simétrica (A Δ B)
    const symmetricDifference = unique([...differenceAB, ...differenceBA]);

    // Calcular Conjunto Potencia
    const powerSetA = calculatePowerSet(arrayA);
    const powerSetB = calculatePowerSet(arrayB);

    // Calcular Producto Cruz
    const cartesianProduct = calculateCartesianProduct(arrayA, arrayB);

    // Actualizar resultados
    setResultA(`${isASubsetOfB ? 'A si es subconjunto de B (A ⊆ B)' : 'A no es subconjunto de B (A ⊈ B)'}`);
    setResultB(`${isBSubsetOfA ? 'B si es subconjunto de A (B ⊆ A)' : 'B no es subconjunto de A (B ⊈ A)'}`);
    setResultUnion(`(A ∪ B): { ${union.join(', ')} } | Cardinalidad: ${union.length}`);
    setResultIntersection(`(A ∩ B): { ${intersection.join(', ')} }  | Cardinalidad: ${intersection.length}`);
    setResultDifferenceAB(`(A - B): { ${differenceAB.join(', ')} }  | Cardinalidad: ${differenceAB.length}`);
    setResultDifferenceBA(`(B - A): { ${differenceBA.join(', ')} }  | Cardinalidad: ${differenceBA.length}`);
    setResultSymmetricDifference(`(A Δ B): { ${symmetricDifference.join(', ')} } | Cardinalidad: ${symmetricDifference.length}`);
    setResultPowerSetA(`P(A): { ${powerSetA.map(subset => `{ ${subset.join(', ') || '∅'} }`).join(', ') || '∅'} }  | Cardinalidad: ${powerSetA.length}`);
    setResultPowerSetB(`P(B): { ${powerSetB.map(subset => `{ ${subset.join(', ') || '∅'} }`).join(', ') || '∅'} }  | Cardinalidad: ${powerSetB.length}`);
    setResultCartesianProduct(`(A × B): { ${cartesianProduct.map(pair => `{ ${pair.join(', ')} }`).join(', ') || '∅'} }  | Cardinalidad: ${cartesianProduct.length}`);
  };

  // Función para calcular el Conjunto Potencia de un conjunto dado
  const calculatePowerSet = (set) => {
    const result = [[]];
    for (let item of set) {
      const len = result.length;
      for (let i = 0; i < len; i++) {
        result.push([...result[i], item]);
      }
    }
    return result;
  };

  // Función para calcular el Producto Cruz de dos conjuntos
  const calculateCartesianProduct = (setA, setB) => {
    const result = [];
    for (let itemA of setA) {
      for (let itemB of setB) {
        result.push([itemA, itemB]);
      }
    }
    return result;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" color="#333" align="center" gutterBottom>
        Calculadora de Conjuntos
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Ingrese los elementos de los conjuntos separados por comas.
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          id="setA"
          label="Conjunto A"
          value={setA}
          onChange={e => setSetA(e.target.value)}
          fullWidth
          sx={{ mr: 1 }}
        />
        <TextField
          id="setB"
          label="Conjunto B"
          value={setB}
          onChange={e => setSetB(e.target.value)}
          fullWidth
          sx={{ ml: 1 }}
        />
      </div>
      <Button variant="contained"   onClick={calculate} fullWidth sx={{ mt: 2 }}>
        Calcular
      </Button>
      <p></p>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        {`A = { ${setA.split(',').map(item => item.trim()).filter(item => item !== '').join(', ') || ''} }`}
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        {`B = { ${setB.split(',').map(item => item.trim()).filter(item => item !== '').join(', ') || ''} }`}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Operaciones
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ width: { xs: '90%', md: '45%' }, p: 3, border:0, margin:1, borderRadius: 2, boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">A ⊆ B</Typography>
            <Typography variant="body1" align="center">{resultA}</Typography>
          </Box > 
          <Box sx={{ width: { xs: '90%', md: '45%' }, p: 3, border:0, margin:1,borderRadius: 2, boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">B ⊆ A</Typography>
            <Typography variant="body1" align="center">{resultB}</Typography>
          </Box>
          <Box sx={{ width: { xs: '90%', md: '45%' }, p: 3, border:0, margin:1, borderRadius: 2, boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">Unión</Typography>
            <Typography variant="body1" align="center">{resultUnion}</Typography>
          </Box>
          <Box sx={{ width: { xs: '90%', md: '45%' }, p: 3, border:0,margin:1, borderRadius: 2, boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">Intersección</Typography>
            <Typography variant="body1" align="center">{resultIntersection}</Typography>
          </Box>
          <Box sx={{ width: { xs: '90%', md: '45%' }, p: 3, border:0, margin:1,borderRadius: 2, boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">Diferencia (A-B)</Typography>
            <Typography variant="body1" align="center">{resultDifferenceAB}</Typography>
          </Box>
          <Box sx={{ width: { xs: '90%', md: '45%' }, p: 3, border:0, margin:1,borderRadius: 2, boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">Diferencia (B-A)</Typography>
            <Typography variant="body1" align="center">{resultDifferenceBA}</Typography>
          </Box>
          <Box sx={{ width: '90%', p: 3, border:0, borderRadius: 2,margin:1, boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">Diferencia simétrica</Typography>
            <Typography variant="body1" align="center">{resultSymmetricDifference}</Typography>
          </Box>
          <Box sx={{ width: '90%', p: 3, border:0, borderRadius: 2,margin:1, boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">Conjunto Potencia (A)</Typography>
            <Typography variant="body1" align="center">{resultPowerSetA}</Typography>
          </Box>
          <Box sx={{ width: '90%', p: 3, border:0, borderRadius: 2,margin:1, boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">Conjunto Potencia (B)</Typography>
            <Typography variant="body1" align="center">{resultPowerSetB}</Typography>
          </Box>
          <Box sx={{ width: '90%', p: 3, border:0, borderRadius: 2, margin:1,boxShadow: 4, mb: 2 }}>
            <Typography variant="body1" align="center">Producto Cruz</Typography>
            <Typography variant="body1" align="center">{resultCartesianProduct}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Subconjuntos;
