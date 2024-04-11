import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

function Universo() {
  const [universe, setUniverse] = useState('');
  const [setA, setSetA] = useState('');
  const [setB, setSetB] = useState('');
  const [setC, setSetC] = useState('');
  const [universeSet, setUniverseSet] = useState(new Set());
  const [universeEntered, setUniverseEntered] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleEnterUniverse = () => {
    const universeArray = universe.split(',').map(item => item.trim());
    const uniqueElements = [...new Set(universeArray)];

    if (universe.trim() === '') {
      alert('Por favor, ingrese el Universo antes de continuar.');
      return;
    }

    if (uniqueElements.length !== universeArray.length || uniqueElements.length > 10) {
      alert('No se aceptan elementos repetidos y con un máximo de 10 elementos.');
      return;
    }

    setUniverseSet(new Set(uniqueElements));
    setUniverseEntered(true);
  };

  const handleEnterSets = () => {
    const setAArray = setA.split(',').map(item => item.trim());
    const setBArray = setB.split(',').map(item => item.trim());
    const setCArray = setC.split(',').map(item => item.trim());

    if (
      setAArray.length > 10 ||
      setBArray.length > 10 ||
      setCArray.length > 10 ||
      setAArray.some(item => !universeSet.has(item) || setAArray.indexOf(item) !== setAArray.lastIndexOf(item)) ||
      setBArray.some(item => !universeSet.has(item) || setBArray.indexOf(item) !== setBArray.lastIndexOf(item)) ||
      setCArray.some(item => !universeSet.has(item) || setCArray.indexOf(item) !== setCArray.lastIndexOf(item))
    ) {
      alert('Solo se aceptan elementos registrados en el Universo y sin repeticiones.');
      return;
    }

    setPreviewVisible(true);
  };

  const handleReset = () => {
    setUniverse('');
    setSetA('');
    setSetB('');
    setSetC('');
    setUniverseSet(new Set());
    setUniverseEntered(false);
    setPreviewVisible(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" color="#333" align="center" gutterBottom>
        Universo de Conjuntos
      </Typography>
      <TextField
        id="universe"
        label="Universo"
        value={universe}
        onChange={(e) => setUniverse(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
        disabled={universeEntered}
      />
      <Button variant="contained" onClick={handleEnterUniverse} fullWidth sx={{ mt: 2, backgroundColor:"#333"}} disabled={universeEntered}>
        Ingresar Universo
      </Button>
      {universeEntered && (
        <>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Ingrese los conjuntos A, B y C:
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextField
              id="setA"
              label="A"
              value={setA}
              onChange={(e) => setSetA(e.target.value)}
              fullWidth
              sx={{ mt: 2, marginRight: '10px' }}
              disabled={previewVisible}
            />
            <TextField
              id="setB"
              label="B"
              value={setB}
              onChange={(e) => setSetB(e.target.value)}
              fullWidth
              sx={{ mt: 2, marginRight: '10px' }}
              disabled={previewVisible}
            />
            <TextField
              id="setC"
              label="C"
              value={setC}
              onChange={(e) => setSetC(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
              disabled={previewVisible}
            />
          </div>
          <Button variant="contained" onClick={handleEnterSets} fullWidth sx={{ mt: 2 , backgroundColor: "#333"}} disabled={previewVisible}>
            Ingresar Conjuntos
          </Button>
          {previewVisible && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Typography variant="body1">
                U: {`{${[...universeSet].join(', ')}}`}
              </Typography>
              <Typography variant="body1">
                A: {`{${setA}}`}
              </Typography>
              <Typography variant="body1">
                B: {`{${setB}}`}
              </Typography>
              <Typography variant="body1">
                C: {`{${setC}}`}
              </Typography>
              <Button variant="contained" onClick={handleReset} sx={{ mt: 2 }}>
                Reiniciar
              </Button>
            </div>
          )}
          {previewVisible && (
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" align="center" gutterBottom>
                      Región 1: A ∩ B ∩ C
                    </Typography>
                    <Typography variant="body2" align="center">
                      {Array.from(universeSet).filter(item => setA.includes(item) && setB.includes(item) && setC.includes(item)).length > 0 ? `{${Array.from(universeSet).filter(item => setA.includes(item) && setB.includes(item) && setC.includes(item)).join(', ')}}` : '{}'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" align="center" gutterBottom>
                      Región 2: A ∩ B 
                    </Typography>
                    <Typography variant="body2" align="center">
                      {Array.from(universeSet).filter(item => setA.includes(item) && setB.includes(item) && !setC.includes(item)).length > 0 ? `{${Array.from(universeSet).filter(item => setA.includes(item) && setB.includes(item) && !setC.includes(item)).join(', ')}}` : '{}'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" align="center" gutterBottom>
                      Región 3: A ∩ C
                    </Typography>
                    <Typography variant="body2" align="center">
                      {Array.from(universeSet).filter(item => setA.includes(item) && !setB.includes(item) && setC.includes(item)).length > 0 ? `{${Array.from(universeSet).filter(item => setA.includes(item) && !setB.includes(item) && setC.includes(item)).join(', ')}}` : '{}'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" align="center" gutterBottom>
                      Región 4: B ∩ C
                    </Typography>
                    <Typography variant="body2" align="center">
                      {Array.from(universeSet).filter(item => !setA.includes(item) && setB.includes(item) && setC.includes(item)).length > 0 ? `{${Array.from(universeSet).filter(item => !setA.includes(item) && setB.includes(item) && setC.includes(item)).join(', ')}}` : '{}'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" align="center" gutterBottom>
                      Región 5: B U C
                    </Typography>
                    <Typography variant="body2" align="center">
                      {Array.from(universeSet).filter(item => setA.includes(item) && !setB.includes(item) && !setC.includes(item)).length > 0 ? `{${Array.from(universeSet).filter(item => setA.includes(item) && !setB.includes(item) && !setC.includes(item)).join(', ')}}` : '{}'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" align="center" gutterBottom>
                      Región 6: A U C
                    </Typography>
                    <Typography variant="body2" align="center">
                      {Array.from(universeSet).filter(item => !setA.includes(item) && setB.includes(item) && !setC.includes(item)).length > 0 ? `{${Array.from(universeSet).filter(item => !setA.includes(item) && setB.includes(item) && !setC.includes(item)).join(', ')}}` : '{}'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" align="center" gutterBottom>
                      Región 7: A U B
                    </Typography>
                    <Typography variant="body2" align="center">
                      {Array.from(universeSet).filter(item => !setA.includes(item) && !setB.includes(item) && setC.includes(item)).length > 0 ? `{${Array.from(universeSet).filter(item => !setA.includes(item) && !setB.includes(item) && setC.includes(item)).join(', ')}}` : '{}'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" align="center" gutterBottom>
                      Región 8: U
                    </Typography>
                    <Typography variant="body2" align="center">
                      {Array.from(universeSet).filter(item => !setA.includes(item) && !setB.includes(item) && !setC.includes(item)).length > 0 ? `{${Array.from(universeSet).filter(item => !setA.includes(item) && !setB.includes(item) && !setC.includes(item)).join(', ')}}` : '{}'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}

export default Universo;
