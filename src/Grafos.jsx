import React, { useRef, useState, useEffect } from 'react';
import './Grafos.css'; // Estilos del componente

const Grafos = () => {
  const canvasRef = useRef(null); // Referencia al elemento canvas
  const [tool, setTool] = useState('vertex'); // Herramienta seleccionada: 'vertex', 'edge', 'arrow', 'loop'
  const [vertices, setVertices] = useState([]); // Lista de vértices en el grafo
  const [edges, setEdges] = useState([]); // Lista de aristas en el grafo
  const [arrows, setArrows] = useState([]); // Lista de flechas en el grafo
  const [loops, setLoops] = useState([]); // Lista de lazos en el grafo
  const [selectedVertex, setSelectedVertex] = useState(null); // Vértice seleccionado para dibujar arista
  const [vertexCounter, setVertexCounter] = useState(65); // Contador para generar letras del abecedario

  // Función para manejar los clics en el lienzo
  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; // Posición x del clic
    const y = event.clientY - rect.top; // Posición y del clic

    // Implementar lógica para cada herramienta
    switch (tool) {
      case 'vertex':
        setVertices([...vertices, { x, y, label: String.fromCharCode(vertexCounter) }]); // Agregar un nuevo vértice a la lista con una letra del abecedario
        setVertexCounter(vertexCounter + 1); // Incrementar el contador de letras
        break;
      case 'edge':
        if (selectedVertex) {
          setEdges([...edges, { start: selectedVertex, end: { x, y } }]); // Agregar una nueva arista
          setSelectedVertex(null); // Reiniciar el vértice seleccionado
        } else {
          setSelectedVertex({ x, y }); // Seleccionar el primer vértice para dibujar la arista
        }
        break;
      case 'arrow':
        if (selectedVertex) {
          setArrows([...arrows, { start: selectedVertex, end: { x, y } }]); // Agregar una nueva flecha
          setSelectedVertex(null); // Reiniciar el vértice seleccionado
        } else {
          setSelectedVertex({ x, y }); // Seleccionar el punto de partida para dibujar la flecha
        }
        break;
      case 'loop':
        setLoops([...loops, { x, y }]); // Agregar un nuevo lazo al vértice seleccionado
        break;
      default:
        break;
    }
  };

  // Función para dibujar el grafo en el lienzo
  const drawGraph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Limpiar el lienzo antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar las aristas
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    edges.forEach(({ start, end }) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    });

    // Dibujar las flechas
    ctx.fillStyle = 'black';
    arrows.forEach(({ start, end }) => {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const angle = Math.atan2(dy, dx);
      const length = Math.sqrt(dx * dx + dy * dy);
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.lineTo(end.x - 10 * Math.cos(angle - Math.PI / 6), end.y - 10 * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(end.x - 10 * Math.cos(angle + Math.PI / 6), end.y - 10 * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
      ctx.fill();
    });

    // Dibujar los vértices
    ctx.fillStyle = 'blue';
    vertices.forEach(({ x, y, label }) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.font = '12px Arial';
      ctx.fillText(label, x + 7, y + 5); // Dibujar la letra del vértice
    });

    // Dibujar los lazos
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    loops.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.stroke();
    });
  };

  // UseEffect para dibujar el grafo cada vez que cambien los vértices
  useEffect(() => {
    drawGraph();
  }, [vertices, edges, arrows, loops]);

  // Función para cambiar la herramienta seleccionada
  const selectTool = (selectedTool) => {
    setTool(selectedTool);
  };

  return (
    <div className="grafo-container">
      <canvas ref={canvasRef} className="grafo-canvas" onClick={handleCanvasClick} width={800} height={600}></canvas>
      <div className="grafo-tools">
        <button onClick={() => selectTool('vertex')}>Agregar Vértices</button>
        <button onClick={() => selectTool('edge')}>Dibujar Aristas</button>
        <button onClick={() => selectTool('arrow')}>Dibujar Flechas</button>
        <button onClick={() => selectTool('loop')}>Agregar Lazos</button>
      </div>
    </div>
  );
};

export default Grafos;
