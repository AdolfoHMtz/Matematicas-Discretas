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

  const handleEnterSets = () => {
    // Verificar que los conjuntos no estén vacíos y no terminen en coma
    if (setA.trim() === '' || setB.trim() === '') {
      alert('Por favor, llene ambos conjuntos antes de continuar.');
      return;
    }
    if (setA.endsWith(',') || setB.endsWith(',')) {
      alert('Por favor, elimine la coma al final de los conjuntos.');
      return;
    }

    // Validar si los conjuntos contienen elementos únicos
    if (!validateSets(setA) || !validateSets(setB)) {
      alert('Por favor, ingrese elementos únicos en los conjuntos.');
      return;
    }

    setPreviewVisible(true);
  };

  const handleEnterRelation = () => {
    // Validar si la relación está ingresada y si se cumple la restricción de relación entre los conjuntos A y B
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
    // Mostrar el preview de la relación
    setRelationPreview(`R={${relation}}`);
    // Calcular propiedades de la relación
    calculateProperties();
  };

  const validateSets = (input) => {
    const elements = input.split(',').map(item => item.trim());
    const uniqueElements = new Set(elements);
    return uniqueElements.size === elements.length;
  };

  const calculateProperties = () => {
    const pairs = relation.trim().split(/\s+/);
    const domainElements = [];
    const codomainElements = [];
    let isFunction = true;

    for (const pair of pairs) {
      const [elementA, elementB] = pair.substring(1, pair.length - 1).split(',');
      domainElements.push(elementA);
      codomainElements.push(elementB);
    }

    // Check for multiple mappings for any element in the domain
    const domainSet = new Set(domainElements);
    const codomainSet = new Set(codomainElements);

    if (domainElements.length !== domainSet.size || codomainElements.length !== codomainSet.size) {
      isFunction = false;
    }

    setIsFunction(isFunction ? 'Es una función' : 'No es una función');

    if (isFunction) {
      setIsInjective('Sí');
      setIsSurjective('Sí');

      const explanation = (
        <div>
          <Typography variant="body1">
            La relación es una función porque cada elemento del conjunto A está relacionado con exactamente un elemento del conjunto B.
          </Typography>
        </div>
      );

      setIsBijective(explanation);
    } else {
      setIsInjective('No');
      setIsSurjective('No');

      const explanation = (
        <div>
          <Typography variant="body1">
            La relación no es una función porque hay al menos un elemento en el conjunto A que está relacionado con más de un elemento del conjunto B.
          </Typography>
        </div>
      );

      setIsBijective(explanation);
    }

    // Check if the relation is injective
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

    // Check if the relation is surjective
    const isSurjective = codomainSet.size === codomainElements.length;

    setIsSurjective(isSurjective ? 'Sí' : 'No');

    // Check if the relation is bijective
    setIsBijective(isInjective && isSurjective ? 'Sí' : 'No');

    setShowProperties(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
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
      <Button variant="contained" onClick={handleEnterSets} fullWidth sx={{ mt: 2 }} disabled={previewVisible}>
        Ingresar Conjuntos
      </Button>
      {previewVisible && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {/* Aquí mostrar la vista previa de los datos */}
          <Typography variant="body1">
            Vista Previa:
          </Typography>
          <Typography variant="body1">
            Conjunto A: {`{${setA}}`}
          </Typography>
          <Typography variant="body1">
            Conjunto B: {`{${setB}}`}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Para ingresar la relación entre el conjunto A y B, ingresa uno por uno cada elemento de la relación
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
          <Typography variant="h5" color="primary" gutterBottom>
            Propiedades de la Relación
          </Typography>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                ¿R es una función?
              </Typography>
              <Typography variant="body1" color={isFunction === 'Es una función' ? 'success' : 'error'}>
                {isFunction}
              </Typography>
              {isFunction === 'Es una función' ? (
                <Typography variant="body1" color="success">
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
              <Typography variant="body1" color={isInjective === 'Sí' ? 'success' : 'error'}>
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
              <Typography variant="body1" color={isSurjective === 'Sí' ? 'success' : 'error'}>
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
              <Typography variant="body1" color={isBijective === 'Sí' ? 'success' : 'error'}>
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
