import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function RelacionAxA() {
  const [setA, setSetA] = useState('');
  const [matrixSize, setMatrixSize] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [relationPreview, setRelationPreview] = useState('');
  const [transitive, setTransitive] = useState(false);
  const [symmetric, setSymmetric] = useState(false);
  const [antisymmetric, setAntisymmetric] = useState(false);
  const [reflexive, setReflexive] = useState(false);
  const [relationType, setRelationType] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [showProperties, setShowProperties] = useState(false); // Estado para controlar la visibilidad de las propiedades

  useEffect(() => {
    initializeMatrix();
  }, [matrixSize]);

  useEffect(() => {
    checkProperties();
  }, [relationPreview]);

  const handleEnterSetA = () => {
    // Verificar que el conjunto A no esté vacío
    if (setA.trim() === '') {
      alert('Por favor, ingrese el conjunto A antes de continuar.');
      return;
    }

    // Verificar que no haya elementos repetidos en el conjunto A
    const elements = setA.trim().split(',').map(item => item.trim());
    const uniqueElements = new Set(elements);
    if (uniqueElements.size !== elements.length) {
      alert('Por favor, asegúrese de que no haya elementos repetidos en el conjunto A.');
      return;
    }

    const setSize = elements.length;

    setMatrixSize(setSize);
    setInputDisabled(true);
  };

  const initializeMatrix = () => {
    const newMatrix = [];
    for (let i = 0; i < matrixSize; i++) {
      const row = new Array(matrixSize).fill(0);
      newMatrix.push(row);
    }
    setMatrix(newMatrix);
  };

  const handleMatrixInputChange = (rowIndex, colIndex) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[rowIndex][colIndex] = updatedMatrix[rowIndex][colIndex] === 0 ? 1 : 0;
    setMatrix(updatedMatrix);
  };

  const printRelation = () => {
    let relation = '';
    const elements = setA.trim().split(',').map(item => item.trim());
    const validIndices = elements.map((_, index) => index);
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        if (matrix[i][j] === 1) {
          relation += `(${elements[validIndices[i]]},${elements[validIndices[j]]}) `;
        }
      }
    }
    setRelationPreview(`{${relation.trim()}}`);
    setShowProperties(true);
  };
  
  const checkProperties = () => {
    const elements = setA.trim().split(',').map(item => item.trim());
    const validIndices = elements.map((_, index) => index);
    let isTransitive = true;
    let isSymmetric = true;
    let isAntisymmetric = true;
    let isReflexive = true;

    // Check Transitivity
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        if (matrix[i][j] === 1) {
          for (let k = 0; k < matrixSize; k++) {
            if (matrix[j][k] === 1 && matrix[i][k] !== 1) {
              isTransitive = false;
              break;
            }
          }
          if (!isTransitive) break;
        }
      }
      if (!isTransitive) break;
    }

    // Check Symmetry
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        if (matrix[i][j] !== matrix[j][i]) {
          isSymmetric = false;
          break;
        }
      }
      if (!isSymmetric) break;
    }

    // Check Antisymmetry
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        if (i !== j && matrix[i][j] === 1 && matrix[j][i] === 1) {
          isAntisymmetric = false;
          break;
        }
      }
      if (!isAntisymmetric) break;
    }

    // Check Reflexivity
    for (let i = 0; i < matrixSize; i++) {
      if (matrix[i][i] !== 1) {
        isReflexive = false;
        break;
      }
    }

    setTransitive(isTransitive);
    setSymmetric(isSymmetric);
    setAntisymmetric(isAntisymmetric);
    setReflexive(isReflexive);

    // Determine Relation Type
    if (isTransitive && isSymmetric && isAntisymmetric && isReflexive) {
      setRelationType('Es una relación de orden total.');
    } else if (isTransitive && isSymmetric && isReflexive) {
      setRelationType('Es una relación de equivalencia.');
    } else if (isTransitive && isAntisymmetric && isReflexive) {
      setRelationType('Es una relación de orden parcial.');
    } else {
      setRelationType('No es una relación de equivalencia ni de orden parcial.');
    }
  };

  const handleReset = () => {
    setSetA('');
    setMatrixSize(0);
    setMatrix([]);
    setRelationPreview('');
    setTransitive(false);
    setSymmetric(false);
    setAntisymmetric(false);
    setReflexive(false);
    setRelationType('');
    setInputDisabled(false);
    setShowProperties(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h3" color="#333" align="center" gutterBottom>
        Relación A x A
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        Ingrese el conjunto A
      </Typography>
      <TextField
        id="setA"
        label="Conjunto A"
        value={setA}
        onChange={(e) => setSetA(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
        disabled={inputDisabled}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="contained" onClick={handleEnterSetA} sx={{ flex: '1', backgroundColor:"#333" }} disabled={inputDisabled}>
          Ingresar Conjunto A
        </Button>
        {inputDisabled && (
          <Button variant="contained" onClick={handleReset} sx={{ flex: '1', ml: 2, bgcolor: 'error.main' }}>
            Eliminar
          </Button>
        )}
      </div>
      {matrixSize > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Ingrese la relación entre los elementos del conjunto A (0 si no hay relación, 1 si hay relación)
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex' }}>
              {setA.split(',').map((element, index) => (
                <Typography key={index} variant="body1" align="center" sx={{ minWidth: '24px', paddingLeft: '27px' }}>
                  {element.trim()}
                </Typography>
              ))}
            </div>
            {matrix.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: 'flex', marginBottom: '5px' }}>
                <Typography variant="body1" align="center" sx={{ minWidth: '26px', padding: '5px' }}>
                  {setA.split(',')[rowIndex].trim()}
                </Typography>
                {row.map((col, colIndex) => (
                  <Button
                    key={colIndex}
                    variant={matrix[rowIndex][colIndex] === 1 ? 'contained' : 'outlined'}
                    onClick={() => handleMatrixInputChange(rowIndex, colIndex)}
                    style={{ margin: '2px', minWidth: '24px', width: '24px', backgroundColor: matrix[rowIndex][colIndex] === 1 ? '#333' : 'white'}}
                  >
                    {matrix[rowIndex][colIndex]}
                  </Button>
                ))}
              </div>
            ))}
          </div>
          <Button variant="contained" onClick={printRelation} fullWidth sx={{ mt: 2, backgroundColor:"primary"}}>
            Imprimir Relación
          </Button>
          {showProperties && ( // Mostrar las propiedades solo si showProperties es verdadero
            <>
              <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              R: {relationPreview}
              </Typography>
              <Typography variant="h5" align="center" gutterBottom sx={{ mt: 1 }}>
                Propiedades de la Relación:
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <Card sx={{ minWidth: 150 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" gutterBottom>
                      ¿Es Transitiva?
                    </Typography>
                    <Typography variant="h6" align="center" color={transitive ? 'green' : 'error'}>
                      {transitive ? 'Sí, es transitiva' : 'No es transitiva'}
                    </Typography>
                    <Typography variant="body2" align="center">
                      Una relación R es transitiva si para cada par ordenado (a, b) y (b, c) en R, también está presente
                      (a, c).
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 150 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" gutterBottom>
                      ¿Es Simétrica?
                    </Typography>
                    <Typography variant="h6" align="center" color={symmetric ? 'green' : 'error'}>
                      {symmetric ? 'Sí, es simétrica' : 'No es simétrica'}
                    </Typography>
                    <Typography variant="body2" align="center">
                      Una relación R es simétrica si para cada par ordenado (a, b) en R, también está presente (b, a).
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 150 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" gutterBottom>
                      ¿Es Antisimétrica?
                    </Typography>
                    <Typography variant="h6" align="center" color={antisymmetric ? 'green' : 'error'}>
                      {antisymmetric ? 'Sí, es antisimétrica' : 'No es antisimétrica'}
                    </Typography>
                    <Typography variant="body2" align="center">
                      Una relación R es antisimétrica si para cada par ordenado (a, b) y (b, a) en R, entonces a = b.
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 150 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" gutterBottom>
                      ¿Es Reflexiva?
                    </Typography>
                    <Typography variant="h6" align="center" color={reflexive ? 'green' : 'error'}>
                      {reflexive ? 'Sí, es reflexiva' : 'No es reflexiva'}
                    </Typography>
                    <Typography variant="body2" align="center">
                      Una relación R es reflexiva si para cada elemento a en el conjunto A, (a, a) está presente en R.
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 150 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" gutterBottom>
                      ¿Qué tipo de relación es?
                    </Typography>
                    <Typography variant="h6" color={"blue"} align="center">
                      {relationType}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      )}
    </Container>
  );
}

export default RelacionAxA;
