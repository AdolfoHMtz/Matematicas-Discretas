import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function RelacionAxB() {
  const [setA, setSetA] = useState('');
  const [setB, setSetB] = useState('');
  const [relation, setRelation] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [relationPreview, setRelationPreview] = useState('');
  const [showProperties, setShowProperties] = useState(false);
  const [isFunction, setIsFunction] = useState('');
  const [isInjective, setIsInjective] = useState('');
  const [isSurjective, setIsSurjective] = useState('');
  const [isBijective, setIsBijective] = useState('');
  const [setsEntered, setSetsEntered] = useState(false);

  const handleEnterSets = () => {
    if (setA.trim() === '' || setB.trim() === '') {
      alert('Por favor, llene ambos conjuntos antes de continuar.');
      return;
    }
    if (setA.endsWith(',') || setB.endsWith(',')) {
      alert('Por favor, elimine la coma al final de los conjuntos.');
      return;
    }
    if (!validateSets(setA) || !validateSets(setB)) {
      alert('Por favor, ingrese elementos únicos en los conjuntos.');
      return;
    }
    setPreviewVisible(true);
    setSetsEntered(true);
  };

  const handleDeleteSets = () => {
    setSetA('');
    setSetB('');
    setRelation('');
    setPreviewVisible(false);
    setRelationPreview('');
    setShowProperties(false);
    setIsFunction('');
    setIsInjective('');
    setIsSurjective('');
    setIsBijective('');
    setSetsEntered(false);
  };

  const handleEnterRelation = () => {
    if (relation.trim() === '') {
      alert('Por favor, ingrese la relación antes de continuar.');
      return;
    }

    const pairs = relation.trim().split(/\s+/);
    for (const pair of pairs) {
      const [elementA, elementB] = pair.substring(1, pair.length - 1).split(',');
      if (!setA.includes(elementA) || !setB.includes(elementB)) {
        alert(`Por favor, asegúrese de que los elementos del par (${elementA},${elementB}) estén presentes en los conjuntos A y B.`);
        return;
      }
    }

    setRelationPreview(`R={${relation}}`);
    calculateProperties();
  };

  const validateSets = (input) => {
    const elements = input.split(',').map(item => item.trim());
    const uniqueElements = new Set(elements);
    return uniqueElements.size === elements.length;
  };

  const calculateProperties = () => {
    // Obtener los elementos únicos de los conjuntos A y B
    const setAElements = new Set(setA.trim().split(',').map(item => item.trim()));
    const setBElements = new Set(setB.trim().split(',').map(item => item.trim()));
  
    // Calcular propiedades
    const pairs = relation.trim().split(/\s+/);
    const domainElements = [];
    const codomainElements = [];
  
    for (const pair of pairs) {
      const [elementA, elementB] = pair.substring(1, pair.length - 1).split(',');
      domainElements.push(elementA);
      codomainElements.push(elementB);
    }
  
    const domainSet = new Set(domainElements);
    const codomainSet = new Set(codomainElements);
  
    let isFunction = true;
  
    if (domainElements.length !== domainSet.size || codomainElements.length !== codomainSet.size) {
      isFunction = false;
    }
  
    setIsFunction(isFunction ? 'Es una función' : 'No es una función');
  
    // Verificar si es inyectiva
    const codomainSetArray = Array.from(codomainSet);
    const mappedDomainSet = domainElements.map((element) => {
      const mappedElements = pairs.filter((pair) => pair.startsWith(`(${element},`));
      return mappedElements.map((pair) => pair.substring(1, pair.length - 1).split(',')[1]);
    });
  
    const isInjective = mappedDomainSet.every((mappedElement, index) => {
      const occurrences = mappedElement.reduce((count, current) => {
        if (current === codomainSetArray[index]) {
          return count + 1;
        }
        return count;
      }, 0);
      return occurrences === 1;
    });
  
    setIsInjective(isInjective ? 'Sí' : 'No');
  
    // Verificar si es sobreyectiva
    const uniqueImages = new Set(pairs.map(pair => pair.split(',')[1]));
    const isSurjective = codomainSet.size === uniqueImages.size;
  
    setIsSurjective(isSurjective ? 'Sí' : 'No');
  
    setIsBijective(isInjective && isSurjective ? 'Sí' : 'No');
    setShowProperties(true);
  };
  

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h3" color="#333" align="center" gutterBottom>
        Relación A x B
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        Ingresa los conjuntos y la relación entre ellos.
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          id="setA"
          label="Conjunto A"
          value={setA}
          onChange={(e) => setSetA(e.target.value)}
          fullWidth
          sx={{ mt: 2, marginRight: '10px' }}
          disabled={previewVisible}
        />
        <TextField
          id="setB"
          label="Conjunto B"
          value={setB}
          onChange={(e) => setSetB(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
          disabled={previewVisible}
        />
      </div>
      {setsEntered ? (
        <Button variant="contained" onClick={handleDeleteSets} fullWidth sx={{ mt: 2 }}>
          Eliminar
        </Button>
      ) : (
        <Button variant="contained" onClick={handleEnterSets} fullWidth sx={{ mt: 2, backgroundColor:"#333" }}>
          Ingresar Conjuntos
        </Button>
      )}
      {previewVisible && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Typography variant="body1">
            Conjunto A: {`{${setA}}`}
          </Typography>
          <Typography variant="body1">
            Conjunto B: {`{${setB}}`}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Para ingresar la relación entre el conjunto A y B, ingresa los elementos de la relación
            usando la estructura (a,b) separando cada par con espacios. Ejemplo: (a,b) (b,c) (c,d).
          </Typography>
          <TextField
            id="relation"
            label="Relación"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleEnterRelation} sx={{ mt: 2 }}>
            Ingresar Relación
          </Button>
          {relationPreview && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {relationPreview}
            </Typography>
          )}
        </div>
      )}
      {showProperties && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h5" color="#333" gutterBottom>
            Propiedades de la Relación
          </Typography>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                ¿R es una función?
              </Typography>
              <Typography variant="h6" color={isFunction === 'Es una función' ? 'green' : 'red'}>
                {isFunction}
              </Typography>
              {isFunction === 'Es una función' ? (
                <Typography variant="body2" color="success">
                  La relación es una función porque cada elemento del conjunto A está relacionado con exactamente un elemento del conjunto B.
                </Typography>
              ) : (
                <Typography variant="body1" color="error">
                  La relación no es una función porque hay al menos un elemento en el conjunto A que está relacionado con más de un elemento del conjunto B.
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                ¿R es inyectiva?
              </Typography>
              <Typography variant="h6" color={isInjective === 'Sí' ? 'green' : 'red' }>
                {isInjective}
              </Typography>
              {isInjective === 'Sí' ? (
                <Typography variant="body1" color="success">
                  La relación es inyectiva porque ningún elemento del conjunto A está relacionado con más de un elemento del conjunto B.
                </Typography>
              ) : (
                <Typography variant="body1" color="error">
                  La relación no es inyectiva porque al menos un elemento del conjunto A está relacionado con más de un elemento del conjunto B.
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                ¿R es sobreyectiva?
              </Typography>
              <Typography variant="h6" color={isSurjective === 'Sí' ? 'green' : 'red' }>
                {isSurjective}
              </Typography>
              {isSurjective === 'Sí' ? (
                <Typography variant="body1" color="success">
                  La relación es sobreyectiva porque para cada elemento del conjunto B existe al menos un elemento del conjunto A que lo mapea.
                </Typography>
              ) : (
                <Typography variant="body1" color="error">
                  La relación no es sobreyectiva porque hay al menos un elemento en el conjunto B que no tiene preimagen en el conjunto A.
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                ¿R es biyectiva?
              </Typography>
              <Typography variant="h6" color={isBijective === 'Sí' ? 'green' : 'red' }>
                {isBijective}
              </Typography>
              {isBijective === 'Sí' ? (
                <Typography variant="body1" color="success">
                  La relación es biyectiva porque es tanto inyectiva como sobreyectiva.
                </Typography>
              ) : (
                <Typography variant="body1" color="error">
                  La relación no es biyectiva porque no es inyectiva y/o no es sobreyectiva.
                </Typography>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Container>
  );
}

export default RelacionAxB;
