import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function RelacionAxA() {
  const [setA, setSetA] = useState('');
  const [matrixSize, setMatrixSize] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [relationPreview, setRelationPreview] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);

  useEffect(() => {
    initializeMatrix();
  }, [matrixSize]);

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
  };

  const handleReset = () => {
    setSetA('');
    setMatrixSize(0);
    setMatrix([]);
    setRelationPreview('');
    setInputDisabled(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
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
        <Button variant="contained" onClick={handleEnterSetA} sx={{ flex: '1' }} disabled={inputDisabled}>
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
                <Typography variant="body1" align="center" sx={{ minWidth: '24px', padding: '5px' }}>
                  {setA.split(',')[rowIndex].trim()}
                </Typography>
                {row.map((col, colIndex) => (
                  <Button
                    key={colIndex}
                    variant={matrix[rowIndex][colIndex] === 1 ? 'contained' : 'outlined'}
                    onClick={() => handleMatrixInputChange(rowIndex, colIndex)}
                    style={{ margin: '2px', minWidth: '24px', width: '24px' }}
                  >
                    {matrix[rowIndex][colIndex]}
                  </Button>
                ))}
              </div>
            ))}
          </div>
          <Button variant="contained" onClick={printRelation} fullWidth sx={{ mt: 2 }}>
            Imprimir Relación
          </Button>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            R: {relationPreview}
          </Typography>
        </div>
      )}
    </Container>
  );
}

export default RelacionAxA;
